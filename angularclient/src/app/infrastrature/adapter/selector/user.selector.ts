import { createSelector } from '@ngrx/store';

import { IAppState } from '../reducer/app.reducer';
import { IUserState } from '../reducer/user.reducer';

const selectUsers = (state: IAppState) => state.users;

export const selectUserList = createSelector(
  selectUsers,
  (state: IUserState) => state.users
);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: IUserState) => state.selectedUser
);

export const selectSelectedMessage = createSelector(
  selectUsers,
  (state: IUserState) => state.error
);
