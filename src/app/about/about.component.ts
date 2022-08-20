import { Component, Inject, OnInit } from '@angular/core';
import { expand, flyInOut } from '../animations/app.animation';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block',
  },
  animations: [flyInOut(), expand()],
})
export class AboutComponent implements OnInit {
  leaders?: Leader[];
  errMess?: string;

  constructor(
    private leaderService: LeaderService,
    @Inject('BaseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe({
      next: (leaders) => (this.leaders = leaders),
      error: (errMess) => (this.errMess = errMess),
    });
  }
}
