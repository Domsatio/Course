export type Course = {
  id: string;
  title: string;
  description: string;
  image: {
    image: string;
  }[];
  video: {
    video: string;
  }[];
  published: boolean;
};

export type UpdateCourse = {
  title?: string;
  description?: string;
  image?: {
    image: string;
  }[];
  video?: {
    video: string;
  }[];
  published?: boolean;
};
