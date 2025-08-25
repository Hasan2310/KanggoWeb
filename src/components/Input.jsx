import { useState } from "react";

export default function Input({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  type = "text" 
}) {
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (required && !value.trim()) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className="mb-4">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
      
      <input
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e);
          if (e.target.value.trim() !== "") setError(false);
        }}
        onBlur={handleBlur}
        placeholder={error ? `⚠️ ${label || "Wajib diisi"}` : placeholder}
        className={`w-full border p-3 rounded-xl outline-none transition
          ${error 
            ? "border-red-500 placeholder-red-400 focus:ring-red-400" 
            : "border-gray-200 focus:ring-[#D89A79]/40 focus:border-[#D89A79]"}
        `}
      />
    </div>
  );
}
