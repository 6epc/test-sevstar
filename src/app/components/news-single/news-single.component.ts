import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IComment, IPost } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit, OnDestroy {
  post!: IPost;
  resolverSub!:Subscription;
  curentCommentIndex = 0;
  pageSize = 3;
  currentCommentsToShow!: IComment[];
  comments!: IComment[]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.getPost();
    this.currentCommentsToShow = this.comments.slice(this.curentCommentIndex, this.pageSize);
  }

  getPost() {
    this.resolverSub = this.activatedRoute.data.subscribe(data => {
      if (data) {
        this.post = data['single'];
      }
      if (this.post.children?.length) {
        this.comments = this.post.children;
      }
    });
  }

  backToNews() {
    this.router.navigate(['/']);
  }

  handlePageEvent(e: PageEvent) {
    this.currentCommentsToShow = this.comments.slice(e.pageSize * e.pageIndex, e.pageIndex * e.pageSize + e.pageSize);
  }

  ngOnDestroy(): void {
    if (this.resolverSub) {
      this.resolverSub.unsubscribe();
    }
  }
}
