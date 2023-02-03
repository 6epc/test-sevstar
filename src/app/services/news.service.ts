import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface INews {
  created_at: string;
  title: string;
  url?: string;
  author: string;
  points?: number;
  story_text?: string;
  comment_text?: string;
  num_comments?: number;
  story_id?: number;
  story_title?: string;
  story_url?: string;
  parent_id?: number;
  created_at_i?: number;
  _tags?: [],
  objectID: number;
  _highlightResult?: {};
}

export interface IData {
  allAvailableNewsNumber: number;
  availableNewsArrPerPage: INews[];
}

export interface IPost {
  id: number;
  created_at: string;
  created_at_i?: number;
  type: string;
  author: string;
  title: string;
  url?: string;
  text: string;
  points: number;
  parent_id?: number;
  story_id?: number;
  children?: IComment[];
}

export interface IComment extends IPost {
  options?: [];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews(newsPerPage: number, page: number): Observable<IData> {
    return this.http.get<IData>(`http://hn.algolia.com/api/v1/search?tags=front_page&page=${page}&hitsPerPage=${newsPerPage}`).pipe(
      map((response: { [key: string]: any }) => {
        return {
          allAvailableNewsNumber: response['nbHits'],
          availableNewsArrPerPage: response['hits'],
        }
      })
    );
  }

  getById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`http://hn.algolia.com/api/v1/items/${id}`)
  }
}
