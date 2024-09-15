export const stringToSlug = (str: string): string => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .trim() // Trim leading/trailing whitespace
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove hyphens from the start and end of the string
};
