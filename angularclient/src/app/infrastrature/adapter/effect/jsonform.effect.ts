import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { IJsonFormUseCase } from '../../../application/interface/api/ijsonform.usecase';
import { ActionTypes } from '../reducer/action.type';
import {
  GetJsonForm,
  GetJsonFormFailure,
  GetJsonFormSuccess,
} from '../reducer/jsonform.reducer';

@Injectable()
export class JsonFormEffects {
  constructor(
    private jsonFormUseCase: IJsonFormUseCase,
    private router: Router,
    private actions$: Actions
  ) {}

  getJsonForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getJsonForm),
      switchMap((action: GetJsonForm) =>
        this.jsonFormUseCase.getJsonForm().pipe(
          map((payload) => new GetJsonFormSuccess(payload)),
          catchError((error) => of(new GetJsonFormFailure(error)))
        )
      )
    )
  );
}
