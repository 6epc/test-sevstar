import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { INews, NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit, OnDestroy {

  news!: INews[];
  page = 0;
  sub!: Subscription;

  length!: number;
  pageSize = 5;
  isLoading = false;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.isLoading = true;
    this.sub = this.newsService.getNews(this.pageSize, this.page).subscribe(data => {
      console.log(data);

      this.news = data.news;
      this.length = data.length;
      this.isLoading = false;
    });
  }

  navigation(url: string, id: number) {
    url ? window.open(url, "_blank") : this.router.navigate(['news', id]);
  }

  absoluteIndex(idx: number): number {
    return this.pageSize * this.page + (idx + 1);
  }

  getDomain(url: string): string | null {
    if (url) {
      return new URL(url).hostname;
    }
    return null
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.page = e.pageIndex;
    this.getNews();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
