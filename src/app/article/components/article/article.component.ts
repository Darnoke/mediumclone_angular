import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BannerComponent } from 'src/app/shared/components/banner/banner.component';
import { FeedComponent } from 'src/app/shared/components/feed/feed.component';
import { FeedTogglerComponent } from 'src/app/shared/components/feedToggler/feedToggler.component';
import { PopularTagsComponent } from 'src/app/shared/components/popularTags/popularTags.component';
import { articleActions } from '../../store/actions';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, filter, map } from 'rxjs';
import {
  selectArticleData,
  selectError,
  selectIsLoading,
} from '../../store/reducers';
import { selectCurrentUser } from 'src/app/auth/store/reducers';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ErrorMessageComponent } from 'src/app/shared/components/errorMessage/errorMessage.component';
import { TagListComponent } from 'src/app/shared/components/tagList/tagList.component';

@Component({
  selector: 'mc-article',
  templateUrl: './article.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LoadingComponent,
    ErrorMessageComponent,
    TagListComponent,
  ],
})
export class ArticleComponent implements OnInit {
  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  isAuthor$ = combineLatest({
    article: this.store.select(selectArticleData),
    currentUser: this.store
      .select(selectCurrentUser)
      .pipe(
        filter(
          (user): user is CurrentUserInterface | null => user !== undefined
        )
      ),
  }).pipe(
    map(({ article, currentUser }) => {
      if (!article || !currentUser) {
        return false;
      }
      return article.author.username === currentUser.username;
    })
  );
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    article: this.store.select(selectArticleData),
    isAuthor: this.isAuthor$,
  });

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }
}
