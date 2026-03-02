import React from "react";

const Formfield = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  props
}) => {
  return (

    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
        className={`
      w-full px-3 py-2 text-sm
      bg-white border border-gray-300 rounded-xl
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
      transition
    `}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Formfield;
