import { Observable } from 'rxjs';
import { UserDTO } from '../../../domain/user';

export abstract class IUserRepository {
  abstract getAll(): Observable<UserDTO[]>;
  abstract getById(id: string): Observable<UserDTO>;
  abstract create(params: UserDTO): Observable<any>;
  abstract update(id: string, params: UserDTO): Observable<any>;
  abstract delete(id: string): Observable<any>;
}

// import { UserDTO } from '../../../domain/user';

// export interface IUserRepository {
//   getAll(): Promise<UserDTO[]>;
//   getById(id: number): Promise<UserDTO>;
//   create(params: UserDTO): Promise<any>;
//   update(id: number, params: UserDTO): Promise<any>;
//   delete(id: number): Promise<any>;
// }
