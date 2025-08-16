import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import { LineChart } from 'react-native-chart-kit';


const Chart = (props) => {

  /*
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
       // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ]
  };

  <Chart value={data}/>
  */

  return (
   

      <LineChart
        data={props.value}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisSuffix='%'
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // optional, defaults to 2dp
          // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          //color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          //labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
          color: `rgba(0, 0, 0, 1)`,
          labelColor:`rgba(0, 0, 0, 1)`, 
                  
          style: {
            borderRadius: 16,            
          },

          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffffff'
          }
          
        }}        
        
        bezier // for a curved line
       
      />

    

  );
};


/* 

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dd1b1bff',
    margin:20
  },

});

 */


export default Chart;