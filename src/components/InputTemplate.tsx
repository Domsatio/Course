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
} from "@material-tailwind/react";
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
  option
}: InputListProps) => {
  const isRequired = validator
    .describe()
    .tests?.find((item: { name: string }) => item.name === "required");
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (option?.api) {
      axios.get(option.api).then((res) => {
        setData(res.data);
      });
    } else {
      setData(option?.data || []);
    }
  }, [option]);

  const getDataApi = () => {
    try {
      const dataApi = axios.get(option?.api || "");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-2 mb-3">
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
          value={value.toString()}
          onChange={(e) => {
            const data = {
              target: {
                name: name,
                value: e,
              },
            };
            onChange && onChange(data);
          }}
          disabled={disabled}
        >
          {listData.map((data, index) => (
            <Option key={index} value={data.value.toString()}>
              {data.title}
            </Option>
          ))}
        </Select>
      )}
      {type === "textarea" && (
        <div className="relative w-full min-w-[200px]">
          <textarea
            className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " name={name} value={value} onChange={onChange} />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
        </div>
      )}
      {type === "datalist" && (
        <datalist id={name}>
          {listData.map((data, index) => (
            <option key={index} value={data.value}>
              {data.title}
            </option>
          ))}
        </datalist>
      )}
      {type === "multicheckbox" && (
        <div className="flex flex-wrap gap-3">
          {listData.map((data, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                name={name}
                value={data.value}
                onChange={onChange}
                disabled={disabled}
                crossOrigin={undefined}
              />
              <Typography color="blue-gray" className="font-medium">
                {data.title}
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
        <Input
          type="date"
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
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
