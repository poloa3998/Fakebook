import React, { useState } from "react";

function RegisterInput(props) {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
      <div className="flex flex-col-reverse w-full">
        <input
          className={
            !focused
              ? "registerInput outline-none"
              : "registerInput outline-none invalid:border-red-500 invalid:text-red-500 peer"
          }
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
        />
        <span className="hidden text-red-500 peer-invalid:block">
          {errorMessage}
        </span>
      </div>
    </>
  );
}

export default RegisterInput;
