import { TestBed, waitForAsync } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { UserDTO } from '../../../domain/user';
import { IAppState } from '../reducer/app.reducer';
import { CreateUser, GetUserList, UpdateUser } from '../reducer/user.reducer';
import { IUserService, UserService } from './user.facade.service';

describe('UserService', () => {
  let service: IUserService;
  let mockStore: MockStore<IAppState>;
  const users: UserDTO[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    },
  ];

  const initialState = { users };
  let mockSelectUserList: MemoizedSelector<IAppState, UserDTO[]>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: IUserService, useClass: UserService },
        provideMockStore({ initialState }),
      ],
    });

    mockStore = TestBed.inject(MockStore);
    service = TestBed.inject(IUserService);

    jest.spyOn(mockStore, 'dispatch');
    jest.spyOn(mockStore, 'select');
    service.userList$ = of(users);
    // spyOn(mockStore, 'dispatch').and.callThrough();
    // spyOn(mockStore, 'select').and.callThrough();
    // mockSelectUserList = mockStore.overrideSelector(initialUserState, []);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch the GetUserList action when getAll is called', () => {
    service.getAll();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new GetUserList());
  });

  it('should dispatch the UpdateUser action when getAll is called', () => {
    const user: UserDTO = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    };

    service.updateUser(user);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      new UpdateUser({ id: user.id, user })
    );
  });

  it.skip('should dispatch the CreateUser action when getAll is called', () => {
    const user: UserDTO = {
      id: '',
      firstName: 'John',
      lastName: 'Doe',
    };
    service.updateUser(user);
    expect(mockStore.dispatch).toHaveBeenCalledWith(new CreateUser(user));
  });
});
