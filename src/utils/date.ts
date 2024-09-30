export const dateFormater = (date: string, option: string): string => {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: option === "long" ? "long" : "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};
