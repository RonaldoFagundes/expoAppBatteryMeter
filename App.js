import {NavigationContainer} from '@react-navigation/native';

import AuthProvider from './src/Contexts/auth';

import Routes from './src/routes';

export default function App() {

  
  return (
     <NavigationContainer>  

        <AuthProvider>

           <Routes/>

       </AuthProvider> 

    </NavigationContainer> 
    
  );
}


