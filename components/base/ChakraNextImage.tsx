import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const ChakraNextImage  = chakra(NextImage, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

export default ChakraNextImage