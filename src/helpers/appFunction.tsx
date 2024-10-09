import { formatDistanceToNow, format, differenceInDays, parse } from "date-fns";
import { id } from "date-fns/locale";

type DateFnsProps = {
  date: string;
  suffix?: boolean;
  targetDate?: string;
  dateFormat: "now" | string;
};

const parseDate = (data: string) => {
  return new Date(data);
};

const formatDate = (data: DateFnsProps) => {
  let result: any = "";
  try {
    result =
      data.date == "now"
        ? format(new Date(), data.dateFormat, { locale: id })
        : data.dateFormat == "now"
          ? formatDistanceToNow(parseDate(data.date), {
            locale: id,
            addSuffix: data.suffix,
          })
          : data.dateFormat == "range"
            ? differenceInDays(
              parseDate(data.targetDate || ""),
              parseDate(data.date)
            )
            : format(parseDate(data.date), data.dateFormat, { locale: id });
  } catch (_) { }
  return result;
};

function ConvertCurrency(number: number): string {
  const _number = parseInt((number || 0).toString());
  let result: string = _number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });
  return result;
}

interface NullProofOptions {
  text?: {
    limit?: number;
  };
  currency?: {};
  date?: {
    format: string;
  };
}

export interface NullProofProps {
  input: any;
  label?: string;
  params: string;
  isLabel?: boolean;
  isBool?: boolean;
  isMap?: boolean;
  limitChar?: number;
  type?: "text" | "currency" | "date" | "map" | "html";
  option?: NullProofOptions;
}

function NullProof({
  input,
  label,
  params,
  isLabel = true,
  isBool = false,
  isMap = false,
  limitChar = 0,
  option,
  type = "text",
}: {
  input: any;
  label?: string;
  params: string;
  isLabel?: boolean;
  isBool?: boolean;
  isMap?: boolean;
  limitChar?: number;
  type?: "text" | "currency" | "date" | "map" | "html";
  option?: NullProofOptions;
}) {
  const attr: string[] = params.split(".");
  let result: any = input;
  let isNull = false;
  for (const attrs of attr) {
    if (result == null) {
      isNull = true;
      break;
    }
    result = result[attrs];
  }
  const processData = () => {
    const limitCh = limitChar || option?.text?.limit || 0;
    if (isMap) {
      if (typeof result === "string" || typeof result === "number") {
        return [];
      } else if (Array.isArray(result)) {
        return result;
      } else {
        return [{ ...result }];
      }
    } else if (type === "text" || type === "html") {
      let json: any = result;
      // if (typeof json === 'object' || Array.isArray(json)) {
      //   return isLabel ? (label ? `${label}` : '_') : null
      // }
      if (limitCh > 0) {
        json = `${result.substring(0, limitCh)}${result.length > limitCh ? "..." : ""
          }`;
      }
      if (type === "html") {
        json = <div dangerouslySetInnerHTML={{ __html: json }}></div>;
      }
      return json;
    } else if (type === "currency") {
      return ConvertCurrency(result || 0);
    } else if (type === "date") {
      return (
        formatDate({
          date: result,
          dateFormat: option?.date?.format || "dd MMMM yyyy",
        }) || "_"
      );
    }
  };
  const nullData = () => {
    if (isMap) {
      return [];
    } else if (isLabel) {
      return label ? `(${label})` : "_";
    } else {
      return null;
    }
  };
  if (isBool) {
    return isNull || result == null;
  } else {
    if (isNull || result == null) {
      return nullData();
    } else {
      return processData();
    }
  }
}

const numberlistPagination = ({
  n,
  p = 1,
  t = 10,
}: {
  n: number;
  p?: number;
  t?: number;
}) => {
  return n + 1 + ((p || 1) - 1) * t;
};

const getQueryParams = () => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    return params;
  }
  return {}
};

const convertStringToBoolean = (value: string): boolean | string => {
  if (value.toLowerCase() === 'true') {
    return true;
  } else if (value.toLowerCase() === 'false') {
    return false;
  }
  return ""; // Return null for invalid inputs
};

function generateRandomString(length:number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

function formatMidtransExpiryDate(date: Date) {
  const pad = (num: number) => String(num).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const timezoneOffset = -date.getTimezoneOffset();
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const offsetHours = pad(Math.floor(Math.abs(timezoneOffset) / 60));
  const offsetMinutes = pad(Math.abs(timezoneOffset) % 60);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${sign}${offsetHours}:${offsetMinutes}`;
}

const generateOrderBy = (param:any) => {
  if (typeof param === "string") {
    const getSortBy = param.split(":").length === 2 ? param.split(":") : ["createdAt", "desc"];
    return {
      [getSortBy[0]]: getSortBy[1],
    };
  }else{
    return param
  }
}

export {
  NullProof,
  ConvertCurrency,
  formatDate,
  parseDate,
  numberlistPagination,
  getQueryParams,
  convertStringToBoolean,
  generateRandomString,
  formatMidtransExpiryDate,
  generateOrderBy
};
