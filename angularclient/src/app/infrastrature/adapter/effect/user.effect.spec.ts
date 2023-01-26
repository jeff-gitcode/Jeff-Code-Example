import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { IUserUseCase } from '../../../application/interface/api/iusers.usecase';
import { UserDTO } from '../../../domain/user';
import {
  CreateUser,
  CreateUserFailure,
  CreateUserSuccess,
  GetUserList,
  GetUserListFailure,
  GetUserListSuccess,
} from '../reducer/user.reducer';
import { UserEffects } from './user.effect';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;
  let userUseCase: IUserUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions$),
        {
          provide: IUserUseCase,
          useValue: {
            getAll: jest.fn(),
            create: jest.fn(),
            // updateUser: jest.fn(),
            // deleteUser: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(UserEffects);
    userUseCase = TestBed.inject(IUserUseCase);
  });

  describe('getUserList$', () => {
    it('should dispatch GetUserListSuccess action on success', () => {
      const users: UserDTO[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
        },
      ];
      const action = new GetUserList();
      const completion = new GetUserListSuccess(users);

      const response = cold('-a|', { a: users });
      const expected = cold('--b', { b: completion });
      userUseCase.getAll = jest.fn(() => response);

      actions$ = hot('-a-', { a: action });
      expect(effects.getUserList$).toBeObservable(expected);
    });

    it('should dispatch GetUserListFailure action on error', () => {
      const error = new Error('Test error');
      const action = new GetUserList();
      const completion = new GetUserListFailure(error);

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      userUseCase.getAll = jest.fn(() => response);

      actions$ = hot('-a-', { a: action });
      expect(effects.getUserList$).toBeObservable(expected);
    });
  });

  describe('addUser$', () => {
    const user: UserDTO = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    };

    it('should dispatch CreateUserSuccess action on success', () => {
      const action = new CreateUser(user);
      const completion = new CreateUserSuccess(user);

      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: completion });
      userUseCase.create = jest.fn(() => response);

      actions$ = hot('-a-', { a: action });
      expect(effects.addUser$).toBeObservable(expected);
    });

    it('should dispatch CreateUserFailure action on error', () => {
      const error = new Error('Test error');
      const action = new CreateUser(user);
      const completion = new CreateUserFailure(error);

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      userUseCase.create = jest.fn(() => response);

      actions$ = hot('-a-', { a: action });
      expect(effects.addUser$).toBeObservable(expected);
    });
  });
});
