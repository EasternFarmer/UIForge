// https://github.com/Jayd-H/joker-forge/blob/30b5336df49f2cf03b7300ba9febeae91154d904/src/components/generic/InputField.tsx
import React, {
  useState,
  forwardRef,
} from "react";
import type { KeyboardEvent, InputHTMLAttributes, ReactNode } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

interface InputFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    "size" | "onKeyDown"
  > {
  label?: string;
  icon?: ReactNode;
  error?: string;
  useGameFont?: boolean;
  separator?: boolean;
  multiline?: boolean;
  height?: string;
  size?: "sm" | "md" | "lg";
  darkmode?: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  labelPosition?: "left" | "center" | "right";
}

const InputField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(
  (
    {
      label,
      icon,
      error,
      useGameFont = false,
      separator = false,
      multiline = false,
      height = "auto",
      size = "md",
      darkmode = false,
      className = "",
      value,
      onChange,
      onKeyDown,
      labelPosition = "center",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const iconSizeClasses = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
    };

    const renderIcon = () => {
      if (icon) {
        return icon;
      }
      return (
        <PencilIcon className={`${iconSizeClasses[size]} text-mint stroke-2`} />
      );
    };

    const getSeparatorColor = () => {
      if (error) return "bg-balatro-red";
      if (isFocused) return "bg-mint";
      return "bg-black-lighter";
    };

    const sizeClasses = {
      sm: {
        padding: "px-2 py-1",
        text: "text-sm",
        iconPadding: "left-2",
        separatorPadding: "left-8",
        contentPadding: "pl-8",
      },
      md: {
        padding: "px-3 py-2",
        text: "text-base",
        iconPadding: "left-3",
        separatorPadding: "left-11",
        contentPadding: "pl-14",
      },
      lg: {
        padding: "px-3 py-2",
        text: "text-xl",
        iconPadding: "left-3",
        separatorPadding: "left-11",
        contentPadding: "pl-14",
      },
    };

    const getLabelPositionClass = () => {
      switch (labelPosition) {
        case "left":
          return "justify-start pl-2";
        case "right":
          return "justify-end pr-2";
        default:
          return "justify-center";
      }
    };

    const getBackgroundClasses = () => {
      if (darkmode) {
        return "bg-black-darker border-black-light";
      }
      return "bg-black-dark border-black-lighter";
    };

    const inputClasses = `
    ${getBackgroundClasses()} text-white-light ${sizeClasses[size].padding
      } font-light ${sizeClasses[size].text}
    ${useGameFont ? "font-game tracking-widest" : "font-lexend tracking-wide"}
    ${sizeClasses[size].contentPadding}
    focus:outline-none rounded-lg
    border-2 focus:border-mint transition-colors w-full
    ${error ? "border-balatro-red" : ""}
    ${props.type === "number"
        ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        : ""
      }
    ${className}
  `;

    return (
      <div className="w-full">
        {label && (
          <div className={`flex ${getLabelPositionClass()}`}>
            <div className="bg-black border-2 border-black-light rounded-md px-4 pb-2 -mb-2 relative">
              <span className={`text-white-light ${sizeClasses[size].text}`}>
                {label}
              </span>
            </div>
          </div>
        )}

        <div className="relative">
          <div
            className={`absolute ${sizeClasses[size].iconPadding} top-1/2 -translate-y-1/2 z-10`}
          >
            {renderIcon()}
          </div>

          {separator && (
            <div
              className={`
            absolute ${sizeClasses[size].separatorPadding
                } top-1/2 -translate-y-1/2 h-[60%] w-px 
            ${getSeparatorColor()}
          `}
            />
          )}

          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={inputClasses}
              style={{ height, resize: "none" }}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={inputClasses}
              {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error && <p className="text-balatro-red text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;