import { Box } from "../components/styles/box";
import { Nav } from "../components/navbar/Navbar";

Box
export const Login = () => {
  return (
    <Box
    css={{
       maxW: '100%',
       background: '$navbarcolor',
    }}
 >
    <Nav isLogin={true}/>
 </Box>
  )
}
