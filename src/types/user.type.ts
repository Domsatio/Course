export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
};

export interface GetUser extends User {
  isSubscribed: boolean;
  subscribeStart: string;
  subscribeEnd: string;
}
