import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor() {}

  getPrmotions(): Promise<Promotion[]> {
    return new Promise((resolve) => {
      // simulate server latency with 2 sec delay
      setTimeout(() => resolve(PROMOTIONS), 2000);
    });
  }

  getPromotion(id: string): Promise<Promotion> {
    return new Promise((resolve) => {
      // simulate server latency with 2 sec delay
      setTimeout(
        () => resolve(PROMOTIONS.filter((promotion) => promotion.id === id)[0]),
        2000
      );
    });
  }

  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise((resolve) => {
      // simulate server latency with 2 sec delay
      setTimeout(
        () => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),
        2000
      );
    });
  }
}
