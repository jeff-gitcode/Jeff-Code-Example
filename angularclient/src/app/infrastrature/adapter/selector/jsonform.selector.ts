import { createSelector } from '@ngrx/store';

import { IAppState } from '../reducer/app.reducer';
import { IJsonFormState } from '../reducer/jsonform.reducer';

const selectJsonForm = (state: IAppState) => state.jsonForm;

export const selectedJsonForm = createSelector(
  selectJsonForm,
  (state: IJsonFormState) => state.jsonForm
);
