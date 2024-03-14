import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { tagActions } from './actions';
import { PopularTagService } from '../services/popularTag.service';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

export const getTag = createEffect(
  (actions$ = inject(Actions), tagService = inject(PopularTagService)) => {
    return actions$.pipe(
      ofType(tagActions.getTags),
      switchMap(() => {
        return tagService.getPopularTags().pipe(
          map((tags: PopularTagType[]) => {
            return tagActions.getTagsSuccess({ tags });
          }),
          catchError(() => {
            return of(tagActions.getTagsFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
