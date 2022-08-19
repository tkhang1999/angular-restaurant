import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes?: Dish[];
  errMess?: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.dishService
      .getDishes()
      .subscribe({
        next: (dishes) => (this.dishes = dishes),
        error: (errMess) => (this.errMess = errMess),
      });
  }
}
