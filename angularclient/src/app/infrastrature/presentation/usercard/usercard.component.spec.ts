import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { of } from 'rxjs';

import { ApplicationModule } from '../../../application/di/application.module';
import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';
import { UsercardComponent } from './usercard.component';

describe('UsercardComponent', () => {
  let component: UsercardComponent;
  let fixture: ComponentFixture<UsercardComponent>;
  let router: Router;
  let navigateSpy;
  let userFacade: IUserService;
  let jsonFormFacade: IJsonFormService;
  const users: UserDTO[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    },
  ];

  const jsonForm = {
    formFields: [
      {
        name: 'firstName',
        label: 'First Name:',
        value: '',
        type: 'text',
        validators: {
          required: true,
        },
      },
    ],
    formList: [
      {
        title: 'ID',
        name: 'id',
      },
    ],
  };

  const initialState = { users };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApplicationModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [UsercardComponent],
      providers: [
        {
          provide: IUserService,
          useValue: {
            selectedUser$: of(users),
            deleteUser: jest.fn(),
            getAll: jest.fn(),
            getUser: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: IJsonFormService,
          useValue: {
            jsonForm$: of(jsonForm),
            getJsonForm: jest.fn(),
          },
        },
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsercardComponent);
    router = TestBed.inject(Router);
    userFacade = TestBed.inject(IUserService);
    jsonFormFacade = TestBed.inject(IJsonFormService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should goToUserList', () => {
    navigateSpy = jest.spyOn(router, 'navigate');

    component.goToUserList();
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should updateUser', () => {
    navigateSpy = jest.spyOn(router, 'navigate');

    component.updateUser();

    expect(userFacade.updateUser).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalled();
  });
});
