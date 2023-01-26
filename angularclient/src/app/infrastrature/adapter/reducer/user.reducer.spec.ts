import { UserDTO } from '../../../domain/user';
// import * as UserActions from './user.actions';
// import { User } from './user.model';
import {
  CreateUser,
  CreateUserFailure,
  CreateUserSuccess,
  GetUserList,
  GetUserListFailure,
  GetUserListSuccess,
  userReducer,
} from './user.reducer';

describe('userReducer', () => {
  const initialState = {
    users: [],
    selectedUser: new UserDTO(),
    loading: false,
    error: '',
  };

  it('should handle getUserList action', () => {
    const action = new GetUserList();
    const expectedState = {
      users: [],
      selectedUser: new UserDTO(),
      loading: true,
      error: '',
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should handle getUserListSuccess action', () => {
    const users: UserDTO[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
      },
    ];
    const action = new GetUserListSuccess(users);
    const expectedState = {
      users,
      selectedUser: new UserDTO(),
      loading: false,
      error: '',
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should handle GetUserListFailure action', () => {
    const error = new Error('Test error');
    const action = new GetUserListFailure([]);
    const expectedState = {
      users: [],
      selectedUser: new UserDTO(),
      loading: false,
      error: 'getUserListFailure',
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should handle createUser action', () => {
    const user: UserDTO = {
      id: '',
      firstName: 'John',
      lastName: 'Doe',
    };

    const action = new CreateUser(user);
    const expectedState = {
      users: [],
      selectedUser: new UserDTO(),
      loading: true,
      error: '',
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should handle createUserSuccess action', () => {
    const user: UserDTO = {
      id: '',
      firstName: 'John',
      lastName: 'Doe',
    };
    const action = new CreateUserSuccess(user);
    const expectedState = {
      users: [user],
      selectedUser: new UserDTO(),
      loading: false,
      error: '[Created] Thank you John Doe',
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });

  it('should handle createUserFailure action', () => {
    const expectedState = {
      users: [],
      selectedUser: new UserDTO(),
      loading: false,
      error: 'createUserFailure',
    };
    const action = new CreateUserFailure(new UserDTO());
    const state = userReducer(initialState, action);

    expect(state).toEqual(expectedState);
  });
});
