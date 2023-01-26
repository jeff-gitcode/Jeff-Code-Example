import { UserDTO } from '../../../domain/user';
import { Observable } from 'rxjs';

export abstract class IUserUseCase {
  abstract getAll(): Observable<UserDTO[]>;
  abstract getById(id: string): Observable<UserDTO>;
  abstract create(params: UserDTO): Observable<any>;
  abstract update(id: string, params: UserDTO): Observable<any>;
  abstract delete(id: string): Observable<any>;
}
