import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
      
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
