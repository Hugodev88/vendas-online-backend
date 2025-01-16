import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { CityService } from 'src/city/city.service';
import { ReturnCepExternalDto } from './dtos/return-cep-external.dto';


@Injectable()
export class CorreiosService {
    URL_CORREIOS = process.env.URL_CEP_CORREIOS

    constructor(
        private readonly httpService: HttpService,
        private readonly cityService: CityService,
    ) { }

    async findAddressByCep(cep: string): Promise<ReturnCepExternalDto> {
        const returnCep = await this.httpService.axiosRef.get<ReturnCepExternalDto>(this.URL_CORREIOS.replace('{CEP}', cep)).then((result) => {
            if (result.data.erro === 'true') {
                throw new NotFoundException("Cep not found")
            }
            return result.data
        }).catch((e: AxiosError) => {
            throw new BadRequestException(`Error in connection request: ${e.message}`)
        })



        return returnCep
    }

}
