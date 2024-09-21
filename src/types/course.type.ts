export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  video: {
    video: string;
    description: string;
    file: string;
  }[];
  published: boolean;
};

export type UpdateCourse = {
  title?: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  video?: {
    video: string;
    description: string;
    file: string;
  }[];
  published?: boolean;
};
