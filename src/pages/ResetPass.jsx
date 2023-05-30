import { Box } from "../components/styles/box";
import { Nav } from "../components/navbar/navbar";

Box
export const ResetPass = () => {
  return (
    <Box
    css={{
       maxW: '100%',
       background: '$navbarcolor',
    }}
 >
    <Nav isResetPass={true}/>
 </Box>
  )
}
