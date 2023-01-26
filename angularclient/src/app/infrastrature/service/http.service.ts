import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { JsonForm } from '../../domain/jsonForm';
import { UserDTO } from '../../domain/user';
import { environment } from '../../environment/environment';

export abstract class IHttpService<T> {
  abstract getAllData(endpoint: string): Observable<T[]>;
  abstract addData(data: T, endpoint: string): Observable<T>;
  abstract deleteData(id: string, endpoint: string): Observable<T>;
  abstract updateData(id: string, data: T, endpoint: string): Observable<T>;
  abstract getData(endpoint: string, id?: string): Observable<T>;
}

export abstract class IUserHttpService extends IHttpService<UserDTO> {}

export abstract class IJsonFormHttpService extends IHttpService<JsonForm> {}

@Injectable({
  providedIn: 'root',
})
export class HttpService<T> implements IHttpService<T> {
  //[TODO] move into env
  // endpoint: string;
  protected baseURL = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // READ ALL
  getAllData(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURL}/${endpoint}`);
  }

  // CREATE
  addData(data: T, endpoint: string): Observable<T> {
    return this.http.post<T>(
      `${this.baseURL}/${endpoint}`,
      JSON.stringify(data),
      this.httpOptions
    );
  }

  // READ
  getData(endpoint: string, id: string = ''): Observable<T> {
    if (id) {
      return this.http.get<T>(`${this.baseURL}/${endpoint}/${id}`);
    }
    return this.http.get<T>(`${this.baseURL}/${endpoint}`);
  }

  // UPDATE
  updateData(id: string, data: T, endpoint: string): Observable<T> {
    const url = endpoint
      ? `${this.baseURL}/${endpoint}/${id}`
      : `${this.baseURL}`;

    return this.http.put<T>(url, JSON.stringify(data), this.httpOptions);
  }

  // DELETE
  deleteData(id: string, endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseURL}/${endpoint}/${id}`);
  }
}

@Injectable()
export class UserHttpService extends HttpService<UserDTO> {
  constructor(http: HttpClient) {
    super(http);

    this.baseURL = environment.apiUrl;
  }
}

@Injectable()
export class JsonFormHttpService extends HttpService<JsonForm> {
  constructor(http: HttpClient) {
    super(http);

    this.baseURL = environment.jsonFormUrl;
  }
}
