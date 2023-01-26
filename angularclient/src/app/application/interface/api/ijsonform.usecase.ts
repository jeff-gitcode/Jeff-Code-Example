import { Observable } from 'rxjs';
import { JsonForm } from '../../../domain/jsonForm';

export abstract class IJsonFormUseCase {
  abstract getJsonForm(): Observable<JsonForm>;
}
