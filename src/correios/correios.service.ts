import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { CityService } from '../city/city.service';
import { ReturnCepExternalDto } from './dtos/return-cep-external.dto';
import { ReturnCepDto } from './dtos/return-cep.dto';
import { CityEntity } from '../city/entities/city.entity';
import { ResponsePriceCorreiosDto } from './dtos/response-price-correios.dto';

@Injectable()
export class CorreiosService {
    URL_CORREIOS = process.env.URL_CEP_CORREIOS

    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService,
        @Inject('SOAP_CORREIOS') private readonly soapClient: any,
    ) { }

    async findAddressByCep(cep: string): Promise<ReturnCepDto> {
        const returnCep = await this.httpService.axiosRef.get<ReturnCepExternalDto>(this.URL_CORREIOS.replace('{CEP}', cep)).then((result) => {
            if (result.data.erro === 'true') {
                throw new NotFoundException("Cep not found")
            }
            return result.data
        }).catch((e: AxiosError) => {
            throw new BadRequestException(`Error in connection request: ${e.message}`)
        })

        const city: CityEntity | undefined = await this.cityService.findCityByName(
            returnCep.localidade,
            returnCep.uf
        ).catch(() => undefined)

        return new ReturnCepDto(returnCep, city?.id, city?.state?.id)
    }

    async priceDelivery(): Promise<ResponsePriceCorreiosDto> {
        return new Promise((resolve) => {
            this.soapClient.CalcPrecoPrazo(
                {
                    nCdServico: '40010',
                    sCepOrigem: '22270010',
                    sCepDestino: '89010000',
                    nVlPeso: 2,
                    nCdFormato: 1,
                    nVlComprimento: 30,
                    nVlAltura: 30,
                    nVlLargura: 30,
                    nVlDiametro: 30,
                    nCdEmpresa: '',
                    sDsSenha: '',
                    sCdMaoPropria: 'N',
                    nVlValorDeclarado: 0,
                    sCdAvisoRecebimento: 'N',
                },
                (_, res: ResponsePriceCorreiosDto) => {
                    if (res) {
                        resolve(res);
                    } else {
                        throw new BadRequestException('Error SOAP');
                    }
                },
            );
        });
    }

}
