import {Box} from '../styles/box';



export const Layout = ({children}) => (
   <Box
      css={{
         maxW: '100%',
         background: '$background',
      }}
   >
      {children}
   </Box>
);
