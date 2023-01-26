import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonForm } from '../domain/jsonForm';
import { IJsonFormUseCase } from './interface/api/ijsonform.usecase';
import { IJsonFormRepository } from './interface/spi/ijsoform.repository';

@Injectable()
export class JsonFormUseCase implements IJsonFormUseCase {
  constructor(private jsonFormRepository: IJsonFormRepository) {}
  getJsonForm(): Observable<JsonForm> {
    return this.jsonFormRepository.get();
  }
}
