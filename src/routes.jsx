import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Home from './Home';
import Graph from './Graph'




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
        name='Graph'
        component={Graph}
      />


  </Stack.Navigator>
  )
};


   

 