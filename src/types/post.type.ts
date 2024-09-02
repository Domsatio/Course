export type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
  published: boolean;
  categories?: string[];
};

export type UpdatePost = {
  title?: string;
  body?: string;
  published?: boolean;
  categories?: string[];
};
