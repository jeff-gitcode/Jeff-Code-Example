import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IUserRepository } from '../../application/interface/spi/iusers.repository';
import { UserDTO } from '../../domain/user';
import { environment } from '../../environment/environment';
import { IUserHttpService } from '../service/http.service';

@Injectable()
export class UserRepository implements IUserRepository {
  private endpoint = environment.apiEndpoint;
  constructor(private httpService: IUserHttpService) {}

  getById(id: string): Observable<UserDTO> {
    return this.httpService
      .getData(this.endpoint, id)
      .pipe(retry(1), catchError(this.handleError));
  }

  create(params: UserDTO): any {
    // TODO: not duplicated email required
    return this.httpService
      .addData(params, this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  update(id: string, params: UserDTO): any {
    return this.httpService
      .updateData(id, params, this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(id: string): any {
    return this.httpService
      .deleteData(id, this.endpoint)
      .pipe(retry(1), catchError(this.handleError));
  }

  getAll(): Observable<UserDTO[]> {
    return this.httpService.getAllData(this.endpoint);
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
    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
