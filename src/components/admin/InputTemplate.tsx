"use client";
import React, { useEffect, useState } from "react";
import { InputListProps } from "@/types/form.type";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";
import {
  Button,
  Input,
  Select,
  Option,
  Checkbox,
  Typography,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import { useDebounce } from "use-debounce";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import CurrencyInput from "react-currency-input-field";
import { format, set } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormInputHooks } from "./FormInput";
import QuillEditor from "./QuillEdtor";

type FileViewerProps = {
  file: string;
  isImage: boolean;
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
};

const FileViewer = ({
  file = "",
  isImage = true,
  isOpen,
  handleOpen,
}: FileViewerProps) => {
  return (
    <Dialog
      size={isImage ? "sm" : "md"}
      open={isOpen}
      handler={() => handleOpen(false)}
    >
      <DialogHeader className="border-b">Preview</DialogHeader>
      <DialogBody className="h-[500px]">
        <div className="relative h-full w-full">
          {isImage ? (
            <Image
              src={file || ""}
              className="object-contain"
              alt="Preview image"
              fill={true}
            />
          ) : (
            <iframe
              src={file}
              width="650"
              height="480"
              style={{ border: "1px solid #ccc" }}
              title="PDF Preview"
            />
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button className="" onClick={() => handleOpen(false)}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

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
  useRiset = false,
}: InputListProps) => {
  const isRequired = validator
    .describe()
    .tests?.find((item: { name: string }) => item.name === "required");
  const [data, setData] = useState<any[]>(listData || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debounceValue] = useDebounce(search, 1500);
  const param = option?.params?.split(/\s*,\s*/) || [];
  const { setDisabled, disabled: formDisabled } = FormInputHooks();

  // a function to fetch data if the data option on the input is from an API
  const getDataApi = async () => {
    setIsLoading(true);
    try {
      const dataApi = await axios.get(option?.api + `?${option?.query}` || "", {
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

  useEffect(() => {
    if (
      option?.api &&
      (option?.type === "multicheckbox" || option?.type === "checkbox")
    ) {
      getDataApi();
    } else {
      setData(listData);
      setIsLoading(false);
    }
    if (type === "image" && typeof value === "string") {
      setPreviewImage(value);
    }
  }, [debounceValue]);

  const handleChangeMultipleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  // const handleImageChange = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     onChange?.({
  //       target: {
  //         name,
  //         value: file,
  //       },
  //     });
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // a function to handle image upload to upladthing
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDisabled(true);
    const files = e.target.files?.[0];
    if (files) {
      try {
        const { data } = await axios.post(
          `/api/uploadThing?actionType=upload&slug=${
            type === "image" ? "imageUploader" : "pdfUploader"
          }`,
          {
            files: [{ name: files.name, type: files.type, size: files.size }],
          }
        );

        const { url, urls, fields, fileUrl } = data[0];
        const formData = new FormData();

        if (fields && typeof fields === "object") {
          Object.entries(fields).forEach(([key, value]: [string, any]) => {
            formData.append(key, value);
          });
        }
        formData.append("file", files);
        const response = await axios.post(urls ? urls[0] : url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 204) {
          onChange?.({
            target: {
              name,
              value: fileUrl,
            },
          });
          setPreviewImage(fileUrl);
        } else {
          console.error("Upload failed:", response.data);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setDisabled(false);
      }
    }
  };

  return (
    <div className={`flex flex-col gap-2 mb-3 ${hide && "hidden"}`}>
      <label className="form-label">
        {label}
        {isRequired && <span className="text-red-600"> *</span>}
      </label>
      {(type === "input" || type === "number" || type === "url") && (
        <Input
          type="text"
          label={label}
          className={className}
          name={name}
          value={value.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.({ target: { name, value: e.target.value } })
          }
          disabled={disabled}
          inputMode={
            type === "number" ? "numeric" : type === "url" ? "url" : "text"
          }
        />
      )}
      {type === "select" && (
        <Select
          className={className}
          label={`Choose ${label}`}
          name={name}
          onClick={() => getDataApi()}
          onChange={(e) => {
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
            value={typeof value === "boolean" ? "" : value || ""}
            onChange={onChange}
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            {label}
          </label>
        </div>
      )}
      {type === "texteditor" && (
        <QuillEditor
          value={String(value) || ""}
          onChange={(content: string) =>
            onChange?.({ target: { name, value: content } })
          }
        />
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
      {type === "checkbox" && (
        <div className="flex flex-wrap gap-3">
          {data?.map((data: any, index) => (
            <div key={index} className="flex items-center gap-2">
              <Checkbox
                name={name}
                value={option?.api ? data[option.id] : data.value}
                onChange={
                  option?.api
                    ? (e) => {
                        onChange?.({
                          target: {
                            name,
                            value: e.target.checked ? data[option.id] : "",
                          },
                        });
                      }
                    : (e) => {
                        onChange?.({
                          target: {
                            name,
                            value: e.target.checked ? data.value : "",
                          },
                        });
                      }
                }
                disabled={disabled}
                crossOrigin={undefined}
                checked={value === (option?.api ? data[option.id] : data.value)}
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
      {type === "multicheckbox" &&
        (!isLoading ? (
          <div>
            <div className="flex flex-wrap gap-3 rounded-md borde p-3">
              {data?.map((item: any, index: number) => {
                const checked =
                  Array.isArray(value) &&
                  value.includes(option?.api ? item[option.id] : item.value);
                if (checked) {
                  return (
                    <Chip
                      key={index}
                      className="cursor-pointer"
                      onClose={() => {
                        const updatedValues = value.filter(
                          (val) =>
                            val !== (option?.api ? item[option.id] : item.value)
                        );
                        onChange?.({
                          target: {
                            name,
                            value: updatedValues,
                          },
                        });
                      }}
                      value={
                        option?.api
                          ? param.map((key: string) => item[key]).join(" | ")
                          : item.title
                      }
                    ></Chip>
                  );
                }
                return null;
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              {data?.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Checkbox
                    name={name}
                    value={option?.api ? item[option.id] : item.value}
                    onChange={handleChangeMultipleCheckbox}
                    disabled={disabled}
                    crossOrigin={undefined}
                    color="blue"
                    checked={
                      Array.isArray(value) &&
                      value.includes(option?.api ? item[option.id] : item.value)
                    }
                  />
                  <Typography
                    color="blue-gray"
                    className="font-medium capitalize"
                  >
                    {option?.api
                      ? param.map((key: string) => item[key]).join(" | ")
                      : item.title}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>...Loading</div>
        ))}

      {type === "label" && (
        <label className={`form-label ${className}`}>{value}</label>
      )}
      {type === "component" && <div className={className}>{value}</div>}
      {(type === "image" || type === "file") && (
        <React.Fragment>
          {value && (
            <FileViewer
              file={value.toLocaleString()}
              isImage={type === "image" ? true : false}
              isOpen={preview}
              handleOpen={setPreview}
            />
          )}
          {!value && !formDisabled && (
            <input
              name={name}
              type="file"
              // accept="image/*"
              onChange={(e) => {
                // handleImageChange(e);
                handleImageUpload(e);
              }}
              className="block w-64 text-sm text-gray-500
                file:py-2 file:px-4 file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                file:cursor-pointer file:h-10 file:leading-tight"
            />
          )}
          {formDisabled && (
            <Typography color="blue-gray" className="text-sm">
              Uploading...
            </Typography>
          )}
          {value && (
            <div className="flex gap-2">
              <Tooltip content="View">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  onClick={() => setPreview(true)}
                >
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </Tooltip>
              <Tooltip content="Delete">
                <button
                  type="button"
                  className="inline-flex justify-center items-center px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 focus:outline-none"
                  onClick={() => {
                    onChange?.({
                      target: {
                        name,
                        value: "",
                      },
                    });
                    setPreviewImage(null);
                  }}
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </Tooltip>
            </div>
          )}
        </React.Fragment>
      )}
      {type === "date" && (
        <DatePicker
          className="border border-blue-gray-200 rounded-md px-3 py-2.5 w-full text-sm font-normal text-blue-gray-700 focus:outline-none focus:border-gray-900 focus:border-2"
          selected={
            Array.isArray(value)
              ? new Date()
              : value
              ? typeof value === "string" || typeof value === "number"
                ? new Date(value)
                : null
              : new Date()
          }
          onChange={(date) => {
            onChange?.({ target: { name, value: date } });
          }}
        />
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
          groupSeparator=","
          decimalSeparator="."
          min={0}
        />
      )}
      {useRiset && (
        <Button
          color="red"
          size="sm"
          className="p-2 max-w-min"
          onClick={() => {
            onChange?.({
              target: {
                name,
                value: type === "multicheckbox" ? [] : "",
              },
            });
          }}
        >
          Reset
        </Button>
      )}
      {error && (
        <Typography color="red" className="text-sm">
          {error}
        </Typography>
      )}
    </div>
  );
};
