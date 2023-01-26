import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { map, Observable } from 'rxjs';

import { UserDTO } from '../../../domain/user';
import { IJsonFormService } from '../../adapter/facade/jsonform.facade.service';
import { IUserService } from '../../adapter/facade/user.facade.service';

@Component({
  selector: 'nx-monorepo-demo-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})
export class UsercardComponent implements OnInit {
  form = new FormGroup({});
  fields$: Observable<FormlyFieldConfig[]> = this.jsonFormFacade.jsonForm$.pipe(
    map((obj) => obj.formFields)
  );

  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      props: {
        label: 'First Name',
        placeholder: 'Enter First Name',
        required: true,
      },
    },
    {
      key: 'lastName',
      type: 'input',
      props: {
        label: 'Last Name',
        placeholder: 'Enter Last Name',
        required: true,
      },
    },
  ];

  user$ = this.userFacade.selectedUser$;
  @Input() model: UserDTO = new UserDTO();
  id!: string;

  constructor(
    private userFacade: IUserService,
    private jsonFormFacade: IJsonFormService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$.subscribe((user: UserDTO) => {
      this.model = { ...user };
    });
  }

  ngOnInit(): void {
    this.jsonFormFacade.getJsonForm();
    this.id = this.route.snapshot.params['id?'];
    if (this.id) {
      this.userFacade.getUser(this.id);
    }
  }

  updateUser() {
    this.userFacade.updateUser(this.model);
    this.goToUserList();
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  onSubmit(model: UserDTO) {
    console.log(this.model);
    if (this.form.valid) {
      // submit the model
      this.updateUser();
    }
  }
}
