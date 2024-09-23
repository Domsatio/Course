import { Input, Typography } from "@material-tailwind/react";
import { FC } from "react";

export interface InputRenderProps {
  label: string;
  name: string;
  id?: string;
  type: string;
  value?: string;
  placeholder: string;
  isRequired?: boolean;
  onChange?: (data: any) => void;
  error?: string;
}

const InputRender: FC<InputRenderProps> = ({
  label,
  value = '',
  isRequired = false,
  error,
  ...rest
}) => {
  return (
    <div className='flex flex-col gap-1'>
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        {label} {isRequired && <span className="text-red-500">*</span>}
      </Typography>
      <Input
        crossOrigin={"true"}
        value={value}
        className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
        labelProps={{
          className: "hidden",
        }}
        {...rest}
      />
      {error &&
        <Typography
          variant="small"
          color="red"
        >
          {error}
        </Typography>
      }
    </div>
  )
}

export default InputRender