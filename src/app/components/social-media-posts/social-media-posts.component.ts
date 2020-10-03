import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialMediaPost } from 'src/app/models/social-media-post.model';

@Component({
  selector: 'app-social-media-posts',
  templateUrl: './social-media-posts.component.html',
  styleUrls: ['./social-media-posts.component.scss']
})
export class SocialMediaPostsComponent implements OnInit {

  socialMediaSearchForm: FormGroup;

  @Input()
  socialMediaPosts: SocialMediaPost[];

  @Output()
  searchSocialMedia: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.socialMediaSearchForm = this.formBuilder.group({
      numberOfPosts: []
    });
  }

  socialMediaSearchSubmit(): void {
    this.searchSocialMedia.emit(this.socialMediaSearchForm.get('numberOfPosts').value);
  }

}
