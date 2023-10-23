import { Injectable } from '@nestjs/common';
import { AdminAdvertisementRepo } from '../repo/ads.repo';
import { CreateAdsDto } from '../dto/ads.dto';

@Injectable()
export class AdminAdvertisementService {
  constructor(private readonly adsRepo: AdminAdvertisementRepo) { }

  async create(params: CreateAdsDto) {
    return await this.adsRepo.insert({
      link: params.link,
      image: params.image,
      title: params.title,
    });
  }
}
