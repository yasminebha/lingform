import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers';
import { QuestionElement } from '@/shared/models/questionElement.model';

export const selectUser = (state: AppState) => state.builder;
// export const getBlockById = createSelector((state) => {
//   return null;
// });
