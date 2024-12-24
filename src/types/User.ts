export enum UserRole {
  STAFF = "staff",
  RESIDENT = "resident",
  FAMILY_MEMBER = "family_member",
}

export interface User {
  id: string;
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
  id: string;
  icon: string;
  day: string;
  time: string;
  title: string;
  notes?: string;
  status: string;
  createdBy: string;
}

export interface CreateActivityDto {
  icon: string;
  day: string;
  time: string;
  title: string;
  notes?: string;
  status: string;
  createdBy: string;
}
