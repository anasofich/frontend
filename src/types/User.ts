export enum UserRole {
  STAFF = "staff",
  RESIDENT = "resident",
  FAMILY_MEMBER = "family_member",
}

export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  activities?: string[];
}

export interface CreateUserDto {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
}

export interface Activity {
  _id: string;
  type: string;
  date: string;
  time: string;
  title: string;
  notes?: string;
  status: string;
  createdBy: string;
}

export interface CreateActivityDto {
  type: string;
  date: string;
  time: string;
  title: string;
  notes?: string;
  status: string;
  createdBy: string;
}
