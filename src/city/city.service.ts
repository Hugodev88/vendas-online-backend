import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,

        private readonly cacheService: CacheService, 
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        const cacheKey = `state_${stateId}`;

        return this.cacheService.getCache<CityEntity[]>(cacheKey, 
            () => this.cityRepository.find({
                where: {
                stateId,
                },
            })
        )
    }

    async findCityById(cityId: number): Promise<CityEntity>{
        const city = await this.cityRepository.findOne({
            where: {
                id: cityId,
            }
        })

        if (!city) {
            throw new NotFoundException(`City Not Found`)
        }

        return city
    }
}
