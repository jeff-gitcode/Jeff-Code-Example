import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';

import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';
@Component({
  selector: 'nx-monorepo-demo-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: [
    // 'bootstrap/dist/css/bootstrap.min.css',
    './userlist.component.css',
  ],
})
export class UserlistComponent {
  userList$: Observable<UserDTO[]> = this.userFacade.userList$;
  error$: Observable<string> = this.userFacade.error$;
  error!: string;
  formList$ = this.jsonFormFacade.jsonForm$.pipe(map((obj) => obj.formList));
  data: any[] = [];
  first = 0;
  rows = 10;

  constructor(
    private toastr: ToastrService,
    private userFacade: IUserService,
    private jsonFormFacade: IJsonFormService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.jsonFormFacade.getJsonForm();
    this.userFacade.getAll();
    this.userFacade.userList$.subscribe((data: any) => {
      this.data = Object.assign([], data);
    });
    this.error$.subscribe((item: string) => {
      this.error = item;
      if (this.error) {
        this.showToast(this.error);
        this.error = '';
      }
    });
  }

  showToast(message: string) {
    this.toastr.info(message, 'Message');
  }

  createUser(id: string) {
    this.router.navigate(['user', id]);
  }

  updateUser(id: string) {
    this.router.navigate(['user', id]);
  }

  deleteUser(id: string) {
    this.userFacade.deleteUser(id);
    this.userFacade.getAll();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.data ? this.first === this.data.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.data ? this.first === 0 : true;
  }
}
