import { Component, OnInit, Inject } from '@angular/core';
import { flyInOut } from '../animations/app.animation';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block',
  },
  animations: [flyInOut(), expand()],
})
export class MenuComponent implements OnInit {
  dishes?: Dish[];
  errMess?: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe({
      next: (dishes) => (this.dishes = dishes),
      error: (errMess) => (this.errMess = errMess),
    });
  }
}
