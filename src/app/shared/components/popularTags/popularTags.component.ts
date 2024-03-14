import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectError, selectTagData, selectIsLoading } from './store/reducers';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../errorMessage/errorMessage.component';
import { LoadingComponent } from '../loading/loading.component';
import { tagActions } from './store/actions';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popularTags.component.html',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, LoadingComponent, RouterLink],
})
export class PopularTagsComponent implements OnInit {
  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    tags: this.store.select(selectTagData),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(tagActions.getTags());
  }
}
