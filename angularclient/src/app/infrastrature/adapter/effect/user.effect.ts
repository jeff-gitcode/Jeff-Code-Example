import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';

import { IUserUseCase } from '../../../application/interface/api/iusers.usecase';
import { ActionTypes } from '../reducer/action.type';
import {
  CreateUser,
  CreateUserFailure,
  CreateUserSuccess,
  DeleteUser,
  DeleteUserFailure,
  DeleteUserSuccess,
  GetUser,
  GetUserFailure,
  GetUserListFailure,
  GetUserListSuccess,
  GetUserSuccess,
  UpdateUser,
  UpdateUserFailure,
  UpdateUserSuccess,
} from '../reducer/user.reducer';

@Injectable()
export class UserEffects {
  constructor(
    private userUseCase: IUserUseCase,
    private router: Router,
    private actions$: Actions
  ) {}

  getUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getUserList),
      switchMap(() =>
        this.userUseCase.getAll().pipe(
          map((users) => new GetUserListSuccess(users)),
          catchError((error) => of(new GetUserListFailure(error)))
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getUser),
      switchMap((action: GetUser) =>
        this.userUseCase.getById(action.payload.id).pipe(
          map((user) => new GetUserSuccess(user)),
          catchError((error) => of(new GetUserFailure(error)))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.createUser),
      switchMap((action: CreateUser) =>
        this.userUseCase.create(action.payload).pipe(
          map((user) => new CreateUserSuccess(user)),
          catchError((error) => of(new CreateUserFailure(error)))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.updateUser),
      switchMap((action: UpdateUser) =>
        this.userUseCase
          .update(action.payload.user.id, action.payload.user)
          .pipe(
            map((user) => new UpdateUserSuccess(user)),
            catchError((error) => of(new UpdateUserFailure(error)))
          )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.deleteUser),
      concatMap((action: DeleteUser) =>
        this.userUseCase.delete(action.payload.id).pipe(
          map((id) => new DeleteUserSuccess(id)),
          catchError((error) => of(new DeleteUserFailure(error)))
        )
      )
    )
  );
}
