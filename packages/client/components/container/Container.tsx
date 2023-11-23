import React, { memo } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-2 md:px-4">{children}</div>
  );
};

export default memo(Container);
