import React, { HTMLAttributes } from "react";

interface Params extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | React.ReactNode[];
}

const Button = ({ children, ...props }: Params) => {
  return <button {...props}>{children}</button>;
};

export default Button;
