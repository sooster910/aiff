import * as React from "react";
// import { Image } from '@geist-ui/core'
import Image from "next/image";
interface ImageCompProps {
  src: string;
}

const ImageComp: React.FunctionComponent<ImageCompProps> = ({ src }) => {
  return (
    <Image
      src={src}
      height="100%"
      width="100%"
      objectFit="cover"
      style={{ borderRadius: "10px", margin: "0 auto" }}
      alt={src}
    />
  );
};

export default ImageComp;
