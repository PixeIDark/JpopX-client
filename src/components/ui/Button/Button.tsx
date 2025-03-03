import React from "react";

const styles = {
  outline: "bg-button-outline border border-stroke-default",
  link: "bg-button-link",
  ghost: "bg-button-ghost",
  active: "bg-button-active text-text-white",
  error: "bg-button-error text-text-white",
} as const;

type ButtonVariant = keyof typeof styles;

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  asChild?: boolean;
}

function Button({
  children,
  onClick,
  variant = "outline",
  className,
  asChild = false,
  ...props
}: ButtonProps) {
  const buttonStyles = `${className || ""} ${styles[variant]} button-hover flex justify-center items-center bg-button-active text-text-h h-12 w-full rounded-xl text-base font-semibold transition-all duration-200`;

  if (asChild && React.isValidElement(children)) {
    const childProps = children.props as any;
    const childOnClick = childProps.onClick;

    const combinedOnClick =
      onClick || childOnClick
        ? (e: React.MouseEvent<Element, MouseEvent>) => {
            if (onClick) onClick(e as React.MouseEvent<HTMLButtonElement>);
            if (childOnClick) childOnClick(e);
          }
        : undefined;

    return React.cloneElement(children, {
      ...childProps,
      ...props,
      onClick: combinedOnClick,
      className: `${childProps.className || ""} ${buttonStyles}`,
    });
  }

  return (
    <button onClick={onClick} className={buttonStyles} {...props}>
      {children}
    </button>
  );
}

export default Button;
