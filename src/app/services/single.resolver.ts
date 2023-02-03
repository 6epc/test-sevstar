import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { IPost, NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class SingleResolver implements Resolve<IPost> {

  constructor(
    private newsService: NewsService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<IPost> {
    return this.newsService.getById(route.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['/'])
        return EMPTY
      })
    )
  }
}
