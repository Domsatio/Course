export const dateFormater = (date: string, option: string): string => {
  const dateObj = new Date(date);

  if (option === "detail") {
    return new Intl.DateTimeFormat("en-UK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(dateObj);
  }

  return new Intl.DateTimeFormat("en-UK", {
    year: "numeric",
    month: option === "long" ? "long" : "2-digit",
    day: "2-digit",
  }).format(dateObj);
};
