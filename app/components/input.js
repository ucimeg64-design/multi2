// components/input.js
export default function InputField({ labelTitle, hintText, value, onTextChange, errorMessage }) {
  return (
    <div className="w-full max-w-[416px] flex flex-col gap-1.5 text-left">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-0.5">
        {labelTitle} <span className="text-red-500">*</span>
      </label>
      
      <input 
        type={labelTitle.toLowerCase().includes("password") ? "password" : "text"}
        placeholder={hintText} 
        value={value} 
        onChange={onTextChange} 
        className={`w-full h-[44px] px-4 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-400 ${
          errorMessage ? "border-red-500" : "border-gray-300"
        }`}
      />
      
      {errorMessage && (
        <p className="text-xs text-red-500 mt-0.5">{errorMessage}</p>
      )}
    </div>
  );
}
