import React from 'react';

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-300"
      >
        {labelName}
      </label>
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="font-semibold text-xs bg-[#2a2a35] hover:bg-[#3a3a45] py-1 px-2 rounded-[5px] text-white transition-colors duration-300"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="bg-[#0b0b1e] border border-gray-800 text-white text-sm rounded-lg focus:ring-neon-blue focus:border-neon-blue outline-none block w-full p-3 placeholder-gray-600 transition-all duration-300 focus:shadow-neon"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      autoComplete="off"
    />
  </div>
);

export default FormField;