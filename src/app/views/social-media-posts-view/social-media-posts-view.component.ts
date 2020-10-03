import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SocialMediaPost } from 'src/app/models/social-media-post.model';
import { SocialMediaInfoService } from 'src/app/services/common/social-media-info.service';

@Component({
  selector: 'app-social-media-posts-view',
  templateUrl: './social-media-posts-view.component.html',
  styleUrls: ['./social-media-posts-view.component.scss']
})
export class SocialMediaPostsViewComponent implements OnInit {

  socialMediaPosts$: Observable<SocialMediaPost[]>;

  constructor(private socialMediaInfoService: SocialMediaInfoService) { }

  ngOnInit(): void {
  }

  searchSocialMedia(numberOfPosts: string): void {
    this.getSocialMediaPosts(numberOfPosts);
  }

  getSocialMediaPosts(numberOfPosts: string): void {
    this.socialMediaPosts$ = this.socialMediaInfoService.getSocialMediaPosts(numberOfPosts);
  }

}
