import { Observable } from 'rxjs';
import { JsonForm } from '../../../domain/jsonForm';

export abstract class IJsonFormRepository {
  abstract get(): Observable<JsonForm>;
}
