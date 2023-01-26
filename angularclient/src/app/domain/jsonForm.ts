import { UserDTO } from './user';

export type FormList = {
  accessor: keyof UserDTO;
  Header: string;
};

export type Controls = {
  name: string;
  label: string;
  value: string;
  type: string;
  validators: any;
};

export class JsonForm {
  formFields!: Controls[];
  formList!: FormList[];
}
