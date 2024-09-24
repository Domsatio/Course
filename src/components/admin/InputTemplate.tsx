"use client";
import React, { Fragment, useEffect, useState } from "react";
import { InputListProps } from "@/types/form.type";
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
  IconButton,
  Switch,
  Spinner,
} from "@material-tailwind/react";
import { useDebounce } from "use-debounce";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import CurrencyInput from "react-currency-input-field";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormInputHooks } from "./FormInput";
import { CheckIcon } from "@heroicons/react/24/solid";
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
              priority
              fill
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
  placeholder = "",
  type = "input",
  isRequired = false,
  onChange,
  disabled = false,
  error,
  hide = false,
  option,
  useReset = false,
}: InputListProps) => {
  const [data, setData] = useState<any[]>([]);
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
          `/api/uploadThing?actionType=upload&slug=${type === "image" ? "imageUploader" : "pdfUploader"
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
    <div className={`flex flex-col gap-2 mb-3 ${hide && "hidden"} ${className}`}>
      <label className={`form-label ${isRequired && "after:content-['*'] after:text-red-600 after:ml-1"}`}>
        {label}
      </label>
      {(type === "input" || type === "url") &&
        <Input
          crossOrigin={name}
          type="text"
          label={label}
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          name={name}
          value={value.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange?.({ target: { name, value: e.target.value } })
          }
          disabled={disabled}
          placeholder={placeholder}
          inputMode={
            type === "url" ? "url" : "text"
          }
          labelProps={{
            className: "hidden",
          }}
        />
      }
      {type === "number" &&
        <Input
          crossOrigin={name}
          type="number"
          label={label}
          className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
          name={name}
          value={value.toString()}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          inputMode={"numeric"}
          labelProps={{
            className: "hidden",
          }}
        />
      }
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
            className="peer h-full min-h-[100px] w-full px-3 py-2.5 rounded-[7px] text-sm !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            placeholder={placeholder}
            name={name}
            value={typeof value === "boolean" ? "" : value || ""}
            onChange={onChange}
          />
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
          <Switch
            crossOrigin={name}
            label={value ? "Yes" : "No"}
            color="blue"
            ripple={false}
            name={name}
            disabled={disabled}
            value={value as string}
            checked={value as boolean}
            onChange={
              (e) => {
                onChange?.({
                  target: {
                    name,
                    value: e.target.checked ? true : false,
                  },
                });
              }
            }
          />
        </div>
      )}
      {type === "multicheckbox" &&
        (!isLoading ? (
          <div>
            <div className="flex flex-wrap gap-3">
              {data?.map((item: any, index: number) => {
                const checked =
                  Array.isArray(value) &&
                  value.includes(option?.api ? item[option.id] : item.value);
                if (checked) {
                  return (
                    <Chip
                      key={index}
                      color="blue"
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
          <div className="w-fit">
            <Chip
              variant="ghost"
              color="yellow"
              size="sm"
              value="Loading"
              icon={
                <Spinner color="amber" className="h-4 w-4" />
              }
            />
          </div>
        ))}

      {type === "label" && (
        <label className={`form-label ${className}`}>{value}</label>
      )}
      {type === "component" && <div className={className}>{value}</div>}
      {(type === "image" || type === "file") && (
        <Fragment>
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
              onChange={(e) => handleImageUpload(e)}
              className="block w-64 text-sm text-gray-500
                file:py-2 file:px-4 file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                file:cursor-pointer file:h-10 file:leading-tight"
            />
          )}
          {formDisabled && (
            <div className="w-fit">
              <Chip
                variant="ghost"
                color="yellow"
                size="sm"
                value="Uploading"
                icon={
                  <Spinner color="amber" className="h-4 w-4" />
                }
              />
            </div>
          )}
          {value && (
            <div className="space-y-2 w-fit">
              <Chip
                variant="ghost"
                color="green"
                size="sm"
                value="Uploaded"
                icon={
                  <CheckIcon className="h-4 w-4" />
                }
              />
              <div className="flex gap-2">
                <Tooltip content="View">
                  <IconButton
                    color="blue"
                    onClick={() => setPreview(true)}
                  >
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Delete">
                  <IconButton
                    color="red"
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
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
        </Fragment>
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
          className="border border-gray-300 rounded-md px-3 py-2.5 w-full text-sm font-normal bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
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
          groupSeparator=","
          decimalSeparator="."
          min={0}
        />
      )}
      {useReset && (
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
