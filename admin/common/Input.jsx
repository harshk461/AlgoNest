import React from "react";

const Input = ({
  label,
  type = "text",
  id,
  placeholder,
  value,
  setValue,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="max-w-full w-[300px] px-4 py-3 rounded-lg outline-none bg-secondary placeholder:text-yellow-300"
      />
    </div>
  );
};

export default Input;
