import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../domain/user';
import { IUserUseCase } from './interface/api/iusers.usecase';
import { IUserRepository } from './interface/spi/iusers.repository';

@Injectable()
export class UserUseCase implements IUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  getAll(): Observable<UserDTO[]> {
    return this.userRepository.getAll();
  }
  getById(id: string): Observable<UserDTO> {
    return this.userRepository.getById(id);
  }
  create(params: UserDTO): Observable<any> {
    return this.userRepository.create(params);
  }
  update(id: string, params: UserDTO): Observable<any> {
    return this.userRepository.update(id, params);
  }
  delete(id: string): Observable<any> {
    return this.userRepository.delete(id);
  }
}
