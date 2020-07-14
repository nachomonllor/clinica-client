import { Category } from '../categories/category.model';
import { TimeSlot } from '../../../models/timeslot.model';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmpassword?: string;
  role: number;
  active: boolean;
  is_verified: boolean;
  categories?: Category[];
  TimeSlot?: TimeSlot[];
  img?: string;
  id?: number;
}
export class User implements IUser{
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public role: number,
    public active: boolean,
    public is_verified: boolean,
    public confirmpassword?: string,
    public categories?: Category[],
    public timeslot?: TimeSlot[],
    public img?: string,
    public id?: number
  ) {}
}