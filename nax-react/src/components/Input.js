function Input({
  type = 'text',
  value,
  placeholder,
  required = false,
  action = () => {}
}) {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          id={placeholder}
          onChange={action}
          value={value}
          className="border-b-2 py-1 border-[#AFC1D6] focus:outline-none bg-white focus:border-b-2 transition-colors duration-100 peer"
          required={required}
          autoComplete="off"
        />
        <label
          htmlFor={placeholder}
          className="absolute left-0 top-1 bg-white cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all duration-100"
        >
          {placeholder}
        </label>
      </div>
    </div>
  );
}

export default Input;
