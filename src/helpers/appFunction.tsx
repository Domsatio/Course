import { formatDistanceToNow, format, differenceInDays, parse } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
  } catch (_) {}
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
        json = `${result.substring(0, limitCh)}${
          result.length > limitCh ? "..." : ""
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

interface DetailPageProps {
  api: string;
  onSusccess: (data: any) => void;
  onError?: (data: any) => void;
  id?: string;
  children?: React.ReactNode; 
}
const DetailPage = ({
  api,
  onSusccess,
  onError,
  id,
  children
}: DetailPageProps) => {
  const router = useRouter();

  useEffect(() => {
    getData();
  }, [router.query.id]);

  const getData = async () => {
    try {
      const res = await axios.get(`/api${api}`, {
        params: {
          id: id || router.query.id,
        },
      });
      onSusccess?.(res.data.data);
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export { NullProof, ConvertCurrency, formatDate, parseDate, DetailPage };
