import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block',
  },
  animations: [flyInOut(), expand()],
})
export class HomeComponent implements OnInit {
  dish?: Dish;
  dishErrMess?: string;
  promotion?: Promotion;
  promotionErrMess?: string;
  leader?: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe({
      next: (dish) => (this.dish = dish),
      error: (errMess) => (this.dishErrMess = errMess),
    });
    this.promotionService.getFeaturedPromotion().subscribe({
      next: (promotion) => (this.promotion = promotion),
      error: (errMess) => (this.promotionErrMess = errMess),
    });
    this.leaderService
      .getFeaturedLeader()
      .subscribe((leader) => (this.leader = leader));
  }
}
