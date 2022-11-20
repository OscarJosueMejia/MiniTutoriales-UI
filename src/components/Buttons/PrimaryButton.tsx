import { PropsWithChildren } from "react";
import { Button } from "./Button";

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}: PropsWithChildren<{ className?: string }>) => {
  const primaryClassName = [className, "primaryButton"].join(" ");
  return (
    <Button {...props} className={primaryClassName}>
      {children}
    </Button>
  );
};
