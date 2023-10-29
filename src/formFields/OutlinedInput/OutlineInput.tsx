import { ChangeEventHandler, useState } from "react";
import styles from "./OutlinedInput.module.scss";
import {
  VscEye as ShowPasswordIcon,
  VscEyeClosed as HidePasswordIcon,
} from "react-icons/vsc";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  type?: string;
  error?: string;
  name?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  maxLength?: number;
  required?: boolean;
  [x: string]: any;
};

const OutlinedInput = ({
  value,
  onChange,
  placeholder,
  type,
  error,
  name,
  style,
  disabled = false,
  maxLength,
  required,
  ...restProps
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className={styles.inputContainer}>
        <div
          className={`${styles.inputBox} ${error ? styles.error : ""} ${
            disabled ? styles.disabled : ""
          }`}
        >
          <input
            type={
              type == "password" ? (showPassword ? "text" : "password") : type
            }
            className={`${required ? styles.required : ""}`}
            {...restProps}
            maxLength={maxLength}
            disabled={disabled}
            style={style}
            name={name}
            value={value}
            placeholder={placeholder ? placeholder : ""}
            onChange={onChange}
          />
          {/* {error ? <div className={styles.errorIcon}><ExclamationIcon /></div> : null} */}
          {type == "password" ? (
            <div
              className={styles.showPasswordIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
            </div>
          ) : null}
        </div>
        {error ? <span className={styles.errorMessage}>{error}</span> : null}
      </div>
    </>
  );
};

export default OutlinedInput;
