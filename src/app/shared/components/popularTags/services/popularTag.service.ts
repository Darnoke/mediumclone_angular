import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';
import { GetPopularTagsInterface } from '../types/getPopularTagsResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const tagUrl = environment.apiUrl + '/tags';
    return this.http
      .get<GetPopularTagsInterface>(tagUrl)
      .pipe(map((response) => response.tags));
  }
}
