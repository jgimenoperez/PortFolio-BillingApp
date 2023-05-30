import { Box } from "../components/styles/box";
import { Nav } from "../components/navbar/navbar";


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
