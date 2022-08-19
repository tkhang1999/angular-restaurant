import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
})
export class DishDetailComponent implements OnInit {
  dish?: Dish;
  dishIds?: string[];
  prev?: string;
  next?: string;
  errMess?: string;

  commentForm: FormGroup;
  @ViewChild('cform') commentFormDirective: any;

  formErrors: any = {
    author: '',
    comment: '',
  };

  validationMessages: any = {
    author: {
      required: 'Author Name is required.',
      minlength: 'Author Name must be at least 2 characters long.',
      maxlength: 'Author Name cannot be more than 25 characters long.',
    },
    comment: {
      required: 'Comment is required.',
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: string
  ) {
    this.commentForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required]],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set form validation messages
  }

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        // set dish to undefined for loading side effect while waiting for dish service
        tap(() => (this.dish = undefined)),
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe({
        next: (dish) => {
          this.dish = dish;
          this.setPrevNext(dish.id);
        },
        error: (errMess) => (this.errMess = errMess),
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds?.indexOf(dishId) || 0;
    this.prev = this.dishIds?.at(
      (this.dishIds?.length + index - 1) % this.dishIds?.length
    );
    this.next = this.dishIds?.at(
      (this.dishIds?.length + index + 1) % this.dishIds?.length
    );
  }

  goBack(): void {
    this.location.back();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }

    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    const comment: Comment = this.commentForm.value;
    comment.date = new Date().toISOString();
    if (this.dish && this.dish.comments) {
      this.dish.comments.push(comment);
    }
    // form reset
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: '',
    });
  }
}
