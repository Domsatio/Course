"use client";
import React, { use, useEffect, useState } from "react";
import { InputListProps } from "@/helpers/typeProps";
import * as Yup from "yup";
import axios from "axios";
import {
  Input,
  Select,
  Option,
  Checkbox,
  Typography,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useDebounce } from "use-debounce";
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import CurrencyInput from "react-currency-input-field";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const InputListRenderer = ({
  className = "",
  name = "",
  label = "",
  value = "",
  type = "input",
  validator = Yup.string().required(),
  onChange,
  disabled = false,
  listData = [],
  error,
  hide = false,
  option,
}: InputListProps) => {
  const isRequired = validator
    .describe()
    .tests?.find((item: { name: string }) => item.name === "required");
  const [data, setData] = useState<any[]>(listData || []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [watch, setWatch] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debounceValue] = useDebounce(search, 1500);
  const param = option?.params?.split(/\s*,\s*/) || [];

  useEffect(() => {
    if (option?.api) {
      getDataApi();
    } else {
      setData(listData);
      setIsLoading(false);
    }
  }, [debounceValue]);

  const getDataApi = async () => {
    setIsLoading(true);
    try {
      const dataApi = await axios.get(option?.api || "", {
        params: {
          search: debounceValue.toLocaleLowerCase(),
        },
      });
      setData(dataApi.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value: selectedValue, name } = e.target;
    let updatedValues = Array.isArray(value) ? [...value] : [];
    if (checked) {
      updatedValues.push(selectedValue);
    } else {
      updatedValues = updatedValues.filter((val) => val !== selectedValue);
    }
    onChange?.({
      target: {
        name,
        value: updatedValues,
      },
    });
  };

  return (
    <div className={`flex flex-col gap-2 mb-3 ${hide && "hidden"}`}>
      <label className="form-label">
        {label}
        {isRequired && <span className="text-red-600">*</span>}
      </label>
      {type === "input" && (
        <Input
          type="text"
          label={label}
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {type === "select" && (
        <Select
          className={className}
          label={`Pilih ${label}`}
          name={name}
          onChange={(e) => {
            console.log(e);
            const data = {
              target: {
                name,
                value: e,
              },
            };
            onChange?.(data);
          }}
          disabled={disabled}
        >
          {/* <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsLoading(true)
          }}
        /> */}
          {!isLoading ? (
            data?.map((selectData: any, index) => (
              <Option
                key={index}
                value={
                  option?.api
                    ? selectData[option.id]?.toString()
                    : selectData.value.toString()
                }
              >
                {option?.api
                  ? param.map((item) => selectData[item]).join(" | ")
                  : selectData.title}
              </Option>
            ))
          ) : (
            <Option>Loading...</Option>
          )}
        </Select>
      )}
      {type === "textarea" && (
        <div className="relative w-full min-w-[200px]">
          <textarea
            className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            name={name}
            value={value}
            onChange={onChange}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
        </div>
      )}
      {type === "datalist" && (
        <datalist id={name}>
          {data?.map((data: any, index) => (
            <option key={index} value={data.value}>
              {data.title}
            </option>
          ))}
        </datalist>
      )}
      {type === "multicheckbox" && (
        <div className="flex flex-wrap gap-3">
          {data?.map((data: any, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                name={name}
                value={option?.api ? data[option.id] : data.value}
                onChange={handleChangeCheckbox}
                disabled={disabled}
                crossOrigin={undefined}
                checked={
                  Array.isArray(value) &&
                  value.includes(option?.api ? data[option.id] : data.value)
                }
              />
              <Typography color="blue-gray" className="font-medium">
                {option?.api
                  ? param.map((item) => data[item]).join(" | ")
                  : data.title}
              </Typography>
            </div>
          ))}
        </div>
      )}
      {type === "label" && (
        <label className={`form-label ${className}`}>{value}</label>
      )}
      {type === "component" && <div className={className}>{value}</div>}
      {type === "csv" && (
        <Input
          type="file"
          className={className}
          name={name}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {type === "date" && (
        <DatePicker 
          className="border border-blue-gray-200 rounded-md px-3 py-2.5 w-full text-sm font-normal text-blue-gray-700 focus:outline-none focus:border-gray-900 focus:border-2"
          selected={Array.isArray(value)
            ? new Date()
            : value ? new Date(value) : new Date()} 
          onChange={(date) => {
          onChange?.({target: {name, value: date}})
        }} />
      )}
      {type === "currency" && (
        <CurrencyInput
          className={`${className} border border-blue-gray-200 rounded-md px-3 py-2.5 w-full text-sm font-normal text-blue-gray-700 focus:outline-none focus:border-gray-900 focus:border-2`}
          name={name}
          value={Number(value) || 0}
          onValueChange={(value, name, values) => {
            onChange?.({
              target: {
                name,
                value,
              },
            });
          }}
          intlConfig={{ locale: "id-ID", currency: "IDR" }}
          // prefix="Rp. "
          groupSeparator= ','
          decimalSeparator= '.'
          min={0}
        />
      )}
      {error && (
        <Typography color="red" className="text-sm">
          {error}
        </Typography>
      )}
    </div>
  );
};
