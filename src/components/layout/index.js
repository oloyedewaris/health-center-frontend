import { Box } from "@chakra-ui/react";
import Navbar from "../navbar";

const LayoutView = ({ children, noPadding, activePage, ...rest }) => (
  <Box
    // pb={"50px"}
    bg="#FBFCFC"
    h={"100%"}
    minH="100vh"
    minInlineSize={"fit-content"}
    color="black"
    {...rest}
  >
    <Navbar activePage={activePage} />
    <Box w={"100%"} px={noPadding ? "0" : "30px"}>
      {children}
    </Box>
  </Box>
);

export default LayoutView