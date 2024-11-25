import * as React from "react"
// import { Image } from '@geist-ui/core'

// import Image from "next/image"
import Image from "next/legacy/image"
import {style} from "@motionone/dom";
interface ImageCompProps {
  src: string
}

const ImageComp: React.FunctionComponent<ImageCompProps> = ({src}) => {
  return (
    <Image
      src={src}
      width={100}
      height={100}
      objectFit={"cover"}
      style={{borderRadius: "10px", margin: "0 auto", flexShrink: 0}}
      alt={src}
    />
  )
}

export default ImageComp
