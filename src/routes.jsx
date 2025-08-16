import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Home from './Home';
import Hardware from './Hardware';


export default function Routes() {




  return (

    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
     
     <Stack.Screen
        name='Home'
        component={Home}
      />

     <Stack.Screen
        name='Hardware'
        component={Hardware}
      />     

  </Stack.Navigator>
  )
};


   

 