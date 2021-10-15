import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router/Router';
import './App.css';
import { Header } from './components/templates/Header';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
