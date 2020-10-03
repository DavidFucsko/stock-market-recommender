import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SearchStockParamters } from 'src/app/models/search-stock-parameters.model';
import { SocialMediaPost } from 'src/app/models/social-media-post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaInfoService {

  public selectedSocialMediaPlatforms = { twitter: true, facebook: true, instagram: true };

  constructor(private httpClient: HttpClient) { }

  getSocialMediaPosts(numberOfPosts: string): Observable<SocialMediaPost[]> {
    let socialParams = new HttpParams();
    socialParams = socialParams.append(
      'numberOfPosts', numberOfPosts);
    const calls = {};
    Object.keys(this.selectedSocialMediaPlatforms).forEach(key => {
      const selectedEndpoint = environment.socialMediaEndpoints.find(
        endpoint => endpoint.platform === key && !!this.selectedSocialMediaPlatforms[key]);
      if (selectedEndpoint) {
        calls[key] = this.httpClient.get<SocialMediaPost[]>(
          `${selectedEndpoint.endpoint}`, { params: socialParams }).pipe(catchError(_ => of([])));
      }
    });

    return forkJoin(calls).pipe(map(result => {
      let posts = [];
      Object.keys(result).forEach(key => posts = [...posts, ...result[key]]);
      return posts;
    }), catchError(_ => of([])));
  }

  socialSelectorsChanged(changes: SearchStockParamters): void {
    this.selectedSocialMediaPlatforms.twitter = changes.twitter;
    this.selectedSocialMediaPlatforms.facebook = changes.facebook;
    this.selectedSocialMediaPlatforms.instagram = changes.instagram;
  }
}
