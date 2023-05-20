import {Box} from '../styles/box';
import { Nav } from './navbar';



// eslint-disable-next-line react/prop-types
export const Layout = ({children}) => (
   <Box
      css={{
         maxW: '100%',
         background: '$navbarcolor',
      }}
   >
      <Nav/>
      {children}
   </Box>
);

