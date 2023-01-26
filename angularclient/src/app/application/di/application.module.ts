import { NgModule } from '@angular/core';
import { JsonFormRepository } from '../../infrastrature/db/jsonform.repository';
import { IJsonFormUseCase } from '../interface/api/ijsonform.usecase';
import { IUserUseCase } from '../interface/api/iusers.usecase';
import { IJsonFormRepository } from '../interface/spi/ijsoform.repository';
import { JsonFormUseCase } from '../jsonform.usecase';
import { UserUseCase } from '../users.usecase';

@NgModule({
  providers: [
    { provide: IJsonFormUseCase, useClass: JsonFormUseCase },
    { provide: IJsonFormRepository, useClass: JsonFormRepository },
    { provide: IUserUseCase, useClass: UserUseCase },
  ],
})
export class ApplicationModule {}
