import { Box } from "../components/styles/box";
import { Nav } from "../components/navbar/navbar";

Box
export const Register = () => {
  return (
    <Box
    css={{
       maxW: '100%',
       background: '$navbarcolor',
    }}
 >
    <Nav isRegister={true}/>
 </Box>
  )
}
