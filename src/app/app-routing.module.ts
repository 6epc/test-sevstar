import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsSingleComponent } from './components/news-single/news-single.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SingleResolver } from './services/single.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/news', pathMatch: 'full' },
  { path: 'news', component: NewsListComponent },
  {
    path: 'news/:id',
    component: NewsSingleComponent,
    resolve: {
      single: SingleResolver
    }
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
