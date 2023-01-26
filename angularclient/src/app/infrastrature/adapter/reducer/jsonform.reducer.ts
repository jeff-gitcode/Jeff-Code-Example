import { Action } from '@ngrx/store';
import { JsonForm } from '../../../domain/jsonForm';
import { ActionTypes } from './action.type';

export interface IJsonFormState {
  jsonForm: JsonForm;
  loading: boolean;
  error: string;
}

export const initialJsonFormState: IJsonFormState = {
  jsonForm: new JsonForm(),
  loading: false,
  error: '',
};

// Get JsonForm
export class GetJsonForm implements Action {
  readonly type = ActionTypes.getJsonForm;
}

export class GetJsonFormSuccess implements Action {
  readonly type = ActionTypes.getJsonFormSuccess;

  constructor(readonly payload: JsonForm) {}
}

export class GetJsonFormFailure implements Action {
  readonly type = ActionTypes.getJsonFormFailure;

  constructor(readonly payload: JsonForm) {}
}

export type JsonFormActions =
  | GetJsonForm
  | GetJsonFormSuccess
  | GetJsonFormFailure;

export const jsonFormReducer = (
  state = initialJsonFormState,
  action: JsonFormActions
): IJsonFormState => {
  switch (action.type) {
    // get user
    case ActionTypes.getJsonForm:
      return { ...state, loading: true };
    case ActionTypes.getJsonFormSuccess:
      return { ...state, jsonForm: action.payload, loading: false };
    case ActionTypes.getJsonFormFailure:
      return { ...state, error: 'getJsonFormFailure', loading: false };
    default:
      return state;
  }
};
