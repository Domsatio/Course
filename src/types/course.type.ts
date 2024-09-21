export type Course = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: {
    image: string;
  }[];
  video: {
    video: string;
    description: string;
    file: string;
    thumbnailUrl: string;
  }[];
  published: boolean;
  slug: string
};

export type UpdateCourse = {
  title?: string;
  slug?: string;
  description?: string;
  image?: {
    image: string;
  }[];
  video?: {
    video: string;
    description: string;
    file: string;
    thumbnailUrl: string;
  }[];
  published?: boolean;
};
