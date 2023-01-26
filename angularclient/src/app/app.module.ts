import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { appRoutes, AppRoutingModule } from './app.routing.module';
import { ApplicationModule } from './application/di/application.module';
import { IUserRepository } from './application/interface/spi/iusers.repository';
import { JsonFormEffects } from './infrastrature/adapter/effect/jsonform.effect';
import { UserEffects } from './infrastrature/adapter/effect/user.effect';
import {
  IJsonFormService,
  JsonFormService,
} from './infrastrature/adapter/facade/jsonform.facade.service';
import {
  IUserService,
  UserService,
} from './infrastrature/adapter/facade/user.facade.service';
import {
  appReducers,
  metaReducers,
} from './infrastrature/adapter/reducer/app.reducer';
import { UserRepository } from './infrastrature/db/user.repository';
import { HomeComponent } from './infrastrature/presentation/home/home.component';
import { NavbarComponent } from './infrastrature/presentation/navbar/navbar.component';
import { UsercardComponent } from './infrastrature/presentation/usercard/usercard.component';
import { UserlistComponent } from './infrastrature/presentation/userlist/userlist.component';
import {
  HttpService,
  IHttpService,
  IJsonFormHttpService,
  IUserHttpService,
  JsonFormHttpService,
  UserHttpService,
} from './infrastrature/service/http.service';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserlistComponent,
    UsercardComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    CommonModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    ApplicationModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects, JsonFormEffects]),
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  exports: [
    UserlistComponent,
    UsercardComponent,
    HomeComponent,
    NavbarComponent,
  ],
  providers: [
    // { provide: IHttpService, useClass: HttpService },
    { provide: IUserHttpService, useClass: UserHttpService },
    { provide: IJsonFormHttpService, useClass: JsonFormHttpService },
    { provide: IJsonFormService, useClass: JsonFormService },
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: UserRepository },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
