import React from "react";

export function TypographyH2({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${className ?? ""}`}
      {...props}
    >
      {children}
    </h2>
  );
} 