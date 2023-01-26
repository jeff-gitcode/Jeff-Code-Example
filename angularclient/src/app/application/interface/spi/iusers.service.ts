import { Observable } from 'rxjs';
import { UserDTO } from '../../../domain/user';

export abstract class IUserService {
  abstract getAll(): Observable<UserDTO[]>;
  abstract getById(id: number): Observable<UserDTO>;
  abstract create(params: UserDTO): Observable<any>;
  abstract update(id: number, params: UserDTO): Observable<any>;
  abstract delete(id: number): Observable<any>;

  // abstract getAll(): Promise<UserDTO[]>;
  // abstract getById(id: number): Promise<UserDTO>;
  // abstract create(params: UserDTO): Promise<any>;
  // abstract update(id: number, params: UserDTO): Promise<any>;
  // abstract delete(id: number): Promise<any>;
}
