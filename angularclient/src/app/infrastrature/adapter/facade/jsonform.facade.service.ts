import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { JsonForm } from '../../../domain/jsonForm';
import { IAppState } from '../reducer/app.reducer';
import { GetJsonForm } from '../reducer/jsonform.reducer';
import { selectedJsonForm } from '../selector/jsonform.selector';

export abstract class IJsonFormService {
  jsonForm$: Observable<JsonForm> = of(new JsonForm());
  jsonForm: JsonForm = new JsonForm();

  abstract getJsonForm(): void;
}

@Injectable()
export class JsonFormService implements IJsonFormService {
  jsonForm$ = this.store.pipe(select(selectedJsonForm));
  jsonForm: JsonForm = new JsonForm();

  constructor(private store: Store<IAppState>) {
    this.jsonForm$.subscribe((data: JsonForm) => {
      this.jsonForm = data;
    });
  }

  getJsonForm(): void {
    this.store.dispatch(new GetJsonForm());
  }
}
