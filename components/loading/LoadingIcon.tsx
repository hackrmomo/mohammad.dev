import lightMode from "./lightMode.json";
import dakrMode from "./darkMode.json";
import Lottie from "lottie-react";
import useDarkMode from "use-dark-mode";
import { CSSProperties } from "react";

export const LoadingIcon = ({
  size,
  style,
  reversed,
}: {
  size?: string | number;
  style?: CSSProperties;
  reversed?: boolean;
}) => {
  const { value: isDarkMode } = useDarkMode();
  return (
    <Lottie
      style={{ ...style, height: size }}
      animationData={
        isDarkMode
          ? reversed
            ? lightMode
            : dakrMode
          : reversed
          ? dakrMode
          : lightMode
      }
      loop
    />
  );
};
