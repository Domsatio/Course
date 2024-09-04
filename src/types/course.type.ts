export type Course = {
    id: string;
    title: string;
    description: string;
    image: Record<string, string>[];
    video: Record<string, string>;
    published: boolean
};

export type UpdateCourse = Omit<Course, "id">;