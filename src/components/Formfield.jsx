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
    
       <div className="mb-3">
      <label className="block font-semibold">{label}</label>
      <input 
        name={name}
        type={type} 
        value={value}
        onChange={onChange}
        {...props}
        className="bg-gray-100 w-full rounded-sm px-2 py-1 text-md focus:ring-1outline-none"
        />
        <p className="text-sm text-red-900">{error}</p>
    </div>
  );
};

export default Formfield;
