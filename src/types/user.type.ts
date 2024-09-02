export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  image?: string;
};

export type UpdateUser = {
  email?: string;
  password?: string;
  name?: string;
  image?: string;
};
