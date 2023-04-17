export interface IUser extends Record<string,any> {
  id?: string;
  name: string;
  surname: string;
  age: number | '';
  city: string;
}