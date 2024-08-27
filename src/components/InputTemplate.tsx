import { InputListProps } from "@/helpers/typeProps";

const InputList = ({
  className = "",
  name = "",
  value = "",
  type = "input",
  // onChange,
  disabled = false,
  listData = [],
}: InputListProps) => {
  return (
    <div className="mb-3">
      <label className="form-label">{name}</label>
      <input
        type={type}
        className={`form-control ${className}`}
        name={name}
        value={value}
        // onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};