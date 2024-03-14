import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

export const tagActions = createActionGroup({
  source: 'tag',
  events: {
    'Get tags': emptyProps(),
    'Get tags success': props<{ tags: PopularTagType[] }>(),
    'Get tags failure': emptyProps(),
  },
});
