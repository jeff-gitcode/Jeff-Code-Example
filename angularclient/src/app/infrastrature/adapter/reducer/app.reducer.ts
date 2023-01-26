import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import {
  IJsonFormState,
  initialJsonFormState,
  jsonFormReducer,
} from './jsonform.reducer';

import { initialUserState, IUserState, userReducer } from './user.reducer';

export interface IAppState {
  router?: RouterReducerState;
  users: IUserState;
  jsonForm: IJsonFormState;
}

export const initialAppState: IAppState = {
  users: initialUserState,
  jsonForm: initialJsonFormState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  users: userReducer,
  jsonForm: jsonFormReducer,
};

export function logger(reducer: ActionReducer<IAppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = [logger]; // environment.production ? [] : [logger];
