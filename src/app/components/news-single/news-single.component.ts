import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

import { IPost, NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit, OnDestroy {
  post!: IPost;
  form!: FormGroup;
  commentsPerPage: number = 3;
  page: number = 1;
  allAvailableComments: number = 0;
  comments: any;
  sub!: Subscription;
  resolverSub!:Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
  ) {}

  ngOnInit(): void {
    this.resolverSub = this.activatedRoute.data.subscribe(data => {
      this.post = data['single'];
    });

    this.form = new FormGroup({
      textarea: new FormControl('', [Validators.required])
    })
  }

  onSendMessage() {
    console.log(this.form.value);
    this.form.reset();
  }

  getPost() {
    this.sub = this.activatedRoute.params.pipe(
      switchMap((params: Params) => {
        return this.newsService.getById(+params['id']);
      })
    ).subscribe((post: any) => {
      this.post = post;
    });
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getPost();
  }

  backToNews() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.resolverSub) {
      this.resolverSub.unsubscribe();
    }
  }
}
