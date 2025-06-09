
 // npm install recharts
 
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';

   /*
    const data = [
      { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
      { name: 'Feb', uv: 600, pv: 4800, amt: 2400 },
      { name: 'Mar', uv: 1300, pv: 11000, amt: 2400 },
    ];
   */


    const data = [
      { name: '1', perc: 90 },
      { name: '2', perc: 80 },
      { name: '3', perc: 100},
      { name: '4', perc: 75 },
    ];




    const Home = () => {

      return (
   
        <LineChart 
          width={400} 
          height={200} 
          data={data}
          
          style={{ 
           flex:1,
           height:'auto', 
           width:'auto',
           paddingRight:30,        
           paddingTop:100,
           paddingBottom: 400,
           backgroundColor:'black',           
        }}>
        

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis/>

          <Line type="monotone" dataKey="perc" stroke="#8884d8" />
      
        </LineChart>

      );
    };

    export default Home;


   




    /*
      npm install recharts

    import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';

    const data = [
      { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
      { name: 'Feb', uv: 600, pv: 4800, amt: 2400 },
      { name: 'Mar', uv: 1300, pv: 11000, amt: 2400 },
    ];

    const App = () => {
      return (
        <LineChart width={300} height={200} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        </LineChart>
      );
    };    
    
    */





    /*

     npm install react-native-chart-kit
    
    import { LineChart } from 'react-native-chart-kit';

    const data = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [
        {
          data: [400, 600, 1300],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        },
      ],
      legend: ['Dados'],
    };

    const App = () => {
      return (
        <LineChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#FFF',
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: '#FFF',
            backgroundGradientToOpacity: 1,
            decimalPlaces: 2,
          }}
        />
      );
    };
    
    */