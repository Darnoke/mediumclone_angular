import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { PopularTagStateInterface } from '../types/popularTagState.interface';
import { tagActions } from './actions';

const initialState: PopularTagStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const tagFeature = createFeature({
  name: 'tag',
  reducer: createReducer(
    initialState,
    on(tagActions.getTags, (state) => ({ ...state, isLoading: true })),
    on(tagActions.getTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.tags,
    })),
    on(tagActions.getTagsFailure, (state) => ({ ...state, isLoading: false })),
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: tagFeatureKey,
  reducer: tagReducer,
  selectIsLoading,
  selectError,
  selectData: selectTagData,
} = tagFeature;
