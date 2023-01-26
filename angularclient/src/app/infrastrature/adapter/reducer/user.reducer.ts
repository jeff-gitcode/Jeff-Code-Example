import { Action } from '@ngrx/store';
import { UserDTO } from '../../../domain/user';
import { ActionTypes } from './action.type';

export interface IUserState {
  users: UserDTO[];
  selectedUser: UserDTO;
  loading: boolean;
  error: string;
}

export const initialUserState: IUserState = {
  users: [],
  selectedUser: new UserDTO(),
  loading: false,
  error: '',
};

// Get All Users
export class GetUserList implements Action {
  readonly type = ActionTypes.getUserList;
}

export class GetUserListSuccess implements Action {
  readonly type = ActionTypes.getUserListSuccess;

  constructor(readonly payload: UserDTO[]) {}
}

export class GetUserListFailure implements Action {
  readonly type = ActionTypes.getUserListFailure;

  constructor(readonly payload: any) {}
}

// Create User
export class CreateUser implements Action {
  readonly type = ActionTypes.createUser;

  constructor(readonly payload: UserDTO) {}
}

export class CreateUserSuccess implements Action {
  readonly type = ActionTypes.createUserSuccess;

  constructor(readonly payload: UserDTO) {}
}

export class CreateUserFailure implements Action {
  readonly type = ActionTypes.createUserFailure;

  constructor(readonly payload: any) {}
}

// Get a User
export class GetUser implements Action {
  readonly type = ActionTypes.getUser;

  constructor(readonly payload: { id: string }) {}
}

export class GetUserSuccess implements Action {
  readonly type = ActionTypes.getUserSuccess;

  constructor(readonly payload: UserDTO) {}
}

export class GetUserFailure implements Action {
  readonly type = ActionTypes.getUserFailure;

  constructor(readonly payload: any) {}
}

// Update User
export class UpdateUser implements Action {
  readonly type = ActionTypes.updateUser;

  constructor(readonly payload: { id: string; user: UserDTO }) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = ActionTypes.updateUserSuccess;

  constructor(readonly payload: UserDTO) {}
}

export class UpdateUserFailure implements Action {
  readonly type = ActionTypes.updateUserFailure;

  constructor(readonly payload: any) {}
}

// Delete User
export class DeleteUser implements Action {
  readonly type = ActionTypes.deleteUser;

  constructor(readonly payload: { id: string }) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = ActionTypes.deleteUserSuccess;

  constructor(readonly payload: { id: string }) {}
}

export class DeleteUserFailure implements Action {
  readonly type = ActionTypes.deleteUserFailure;

  constructor(readonly payload: any) {}
}

export type UserActions =
  | GetUser
  | GetUserSuccess
  | GetUserFailure
  | CreateUser
  | CreateUserSuccess
  | CreateUserFailure
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure
  | DeleteUser
  | DeleteUserSuccess
  | DeleteUserFailure
  | GetUserList
  | GetUserListSuccess
  | GetUserListFailure;

export const userReducer = (
  state = initialUserState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    // get user list
    case ActionTypes.getUserList:
      return { ...state, loading: true };
    case ActionTypes.getUserListSuccess:
      return {
        ...state,
        users: action.payload,
        selectedUser: new UserDTO(),
        loading: false,
      };
    case ActionTypes.getUserListFailure:
      return { ...state, error: 'getUserListFailure', loading: false };
    // get user
    case ActionTypes.getUser:
      return { ...state, loading: true, error: '' };
    case ActionTypes.getUserSuccess:
      return { ...state, selectedUser: action.payload, loading: false };
    case ActionTypes.getUserFailure:
      return { ...state, error: 'getUserFailure', loading: false };
    //Create user
    case ActionTypes.createUser:
      return { ...state, loading: true, error: '' };
    case ActionTypes.createUserSuccess:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false,
        error: `[Created] Thank you ${action.payload.firstName} ${action.payload.lastName}`,
      };
    case ActionTypes.createUserFailure:
      return { ...state, error: 'createUserFailure', loading: false };
    // Update user
    case ActionTypes.updateUser:
      return { ...state, loading: true, error: '' };
    case ActionTypes.updateUserSuccess:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        }),
        loading: false,
        error: `[Updated] Thank you ${action.payload.firstName} ${action.payload.lastName}`,
      };
    case ActionTypes.updateUserFailure:
      return { ...state, error: 'updateUserFailure', loading: false };
    // Delete user
    case ActionTypes.deleteUser:
      const deleteRecord = state.users.filter(
        (user) => user.id === action.payload.id
      )[0];

      return { ...state, selectedUser: deleteRecord, loading: true, error: '' };
    case ActionTypes.deleteUserSuccess:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== state.selectedUser.id),
        loading: false,
        error: `[Deleted] Thank you ${state.selectedUser.firstName} ${state.selectedUser.lastName}`,
        selectedUser: new UserDTO(),
      };
    case ActionTypes.deleteUserFailure:
      return { ...state, error: 'deleteUserFailure', loading: false };
    default:
      return state;
  }
};
