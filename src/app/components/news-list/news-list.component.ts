import { Component, OnDestroy, OnInit } from '@angular/core';
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
  hitsPerPage: number = 6;
  page: number = 1;
  allAvailableNewsNumber: number = 0;
  sub!: Subscription;

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.sub = this.newsService.getNews(this.hitsPerPage, this.page).subscribe(data => {
      this.news = data.availableNewsArrPerPage;
      this.allAvailableNewsNumber = data.allAvailableNewsNumber;
    });
  }

  navigation(url: string, id: number) {
    url ? window.open(url, "_blank") : this.router.navigate(['news', id]);
  }

  pageChangeEvent(event: number) {
    this.page = event;
    this.getNews();
  }

  absoluteIndex(idx: number): number {
    return this.hitsPerPage * (this.page - 1) + (idx + 1);
  }

  getDomain(url: string): string | null {
    if (url) {
      return new URL(url).hostname;
    }
    return null
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
