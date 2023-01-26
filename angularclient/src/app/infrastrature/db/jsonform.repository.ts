import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { IJsonFormRepository } from '../../application/interface/spi/ijsoform.repository';
import { JsonForm } from '../../domain/jsonForm';
import { environment } from '../../environment/environment';
import { IJsonFormHttpService } from '../service/http.service';

@Injectable()
export class JsonFormRepository implements IJsonFormRepository {
  private endpoint = environment.jsonFormEndpoint;
  constructor(private httpService: IJsonFormHttpService) {}
  get(): Observable<JsonForm> {
    return this.httpService.getAllData(this.endpoint).pipe(
      map((data) => data[0]),
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
