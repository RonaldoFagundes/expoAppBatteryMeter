import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';




import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';

import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../Contexts/auth';



export default function Hardware({ navigation }) {


  const [isLoading, setIsLoading] = useState(true);

  const { endpoint } = useContext(AuthContext);




  useEffect(() => {

    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };

  }, []);




  const [meter, setMeter] = useState({
    volt: 12,
    res: 6,
    temp: 20,
    fk: 0,
    new: 0
  });



  //const [mete, setMete] = useState([]);




  const handleInputChangeCad = (atribute, value) => {

    setMeter(
      {
        ...meter, [atribute]: Number(value)
      }
    )
  }











  const sendMeter = async () => {

    await fetch(endpoint + "?action=insert_meter", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        meter
      })
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });

  }




  /*
   const sendMeter4 = async () => {
 
     await fetch(endpoint + "?action=insert_meter")
       .then((res) => res.json())
       .then(
         (result) => {
           // console.log(result);
         })
       .catch(function (error) {
         console.log('erro => ' + error.message);
       });
   }
 
 
 
 
   const sendMeter3 = async () => {
 
       await fetch(endpoint + "?action=insert_meter", {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body:JSON.parse(JSON.stringify({meter}))  
       })
          .then((res) => res.json())
          .then(
 
             (result) => {                 
      
                console.log(result);
 
             })
          .catch((error) =>
             console.log(" type error => " + error));
      
    }
 
 
 
   const sendMeter2 = async () =>{
 
     //console.log(meter);
      
      await fetch(endpoint+"?action=insert_meter",{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body: JSON.stringify({
            meter
         })
      })
       .then( (res) => res.json() )
       .then( ( result ) =>{          
         console.log(result);
       })
       .catch(function (error) {
          console.log('erro => ' + error.message);
       });
 }
 
 */









  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Starting hardware...</Text>
      </View>
    )
  }




  return (
    /* 
     <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={{ height: '100%' }}
     >
    */


    <View style={styles.main}>

      <View style={styles.header}>
        <Text style={styles.textHeader}>
          {`HARDWARE `}
        </Text>
      </View>


      <ScrollView>

        <View style={styles.container}>

          <View style={styles.content}>

            <Text style={styles.textContent}>
              {`Reference Values `}
            </Text>


            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='info-circle' size={20} color={"black"} style={styles.icon} />
                {` ID`}
              </Text>

              <Text style={styles.textRef}>
                {meter.fk}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='bolt' size={20} color={"black"} style={styles.icon} />
                {` Volts`}
              </Text>

              <Text style={styles.textRef}>
                {meter.volt}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='chain' size={20} color={"black"} style={styles.icon} />
                {` Res`}
              </Text>

              <Text style={styles.textRef}>
                {meter.res}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='thermometer-2' size={20} color={"black"} style={styles.icon} />
                {` Temp`}
              </Text>

              <Text style={styles.textRef}>
                {meter.temp}
              </Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='microchip' size={20} color={"black"} style={styles.icon} />
                {` New`}
              </Text>

              <Text style={styles.textRef}>
                {meter.new}
              </Text>
            </View>

          </View>


          <View style={styles.content}>

            <Text style={styles.textContent}>
              {`Change Values`}
            </Text>


            <View style={styles.box}>

              <Text style={styles.textInfo}>
                <FontAwesome name='info-circle' size={20} color={"black"} style={styles.icon} />
                {` ID`}
              </Text>


              <TextInput style={styles.input}
                //placeholder={String(meter.fk)}
                placeholder={`${meter.fk}`}
                placeholderTextColor="#44E8C3"
                type="text"
                onChangeText={
                  (valor) => handleInputChangeCad('fk', valor)
                }
                value={meter.fk}
              />

            </View>




            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='bolt' size={20} color={"black"} style={styles.icon} />
                {` VOLTS`}
              </Text>
              <TextInput style={styles.input}
                placeholder={`${meter.volt}`}
                //placeholder={String(meter.volt)}
                placeholderTextColor="#44E8C3"
                type="text"
                onChangeText={
                  (valor) => handleInputChangeCad('volt', valor)
                }
                value={meter.volt}
              />
            </View>



            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='chain' size={20} color={"black"} style={styles.icon} />
                {` RES`}
              </Text>
              <TextInput style={styles.input}
                placeholder={`${meter.res}`}
                //placeholder={String(meter.res)}
                placeholderTextColor="#44E8C3"
                type="text"
                onChangeText={
                  (valor) => handleInputChangeCad('res', valor)
                }
                value={meter.res}
              />
            </View>




            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='thermometer-2' size={20} color={"black"} style={styles.icon} />
                {` TEMP`}
              </Text>
              <TextInput style={styles.input}
                // placeholder={String(meter.temp)}
                placeholder={`${meter.temp}`}
                placeholderTextColor="#44E8C3"
                type="text"
                onChangeText={
                  (valor) => handleInputChangeCad('temp', valor)
                }
                value={meter.temp}
              />
            </View>




            <View style={styles.box}>
              <Text style={styles.textInfo}>
                <FontAwesome name='microchip' size={20} color={"black"} style={styles.icon} />
                {` NEW`}
              </Text>
              <TextInput style={styles.input}
                placeholder={`${meter.new}`}
                //placeholder={String(meter.new)}
                placeholderTextColor="#44E8C3"
                type="text"

                // onKeyPress={handleInputChangeCad('new', true)}
                //  onChange={handleInputChangeCad('new', true)}

                onChangeText={
                  (valor) => handleInputChangeCad('new', valor)
                }

                value={meter.new}

              />
            </View>


            <Pressable style={styles.btn}
              /*   onPress={() => navigation.navigate("Home")}> */
              onPress={() => sendMeter()}>
              <FontAwesome name='plug' size={20} color={"black"} style={styles.icon} />
            </Pressable>


          </View>

        </View>


        <View style={styles.boxBtn}>
          <Pressable style={styles.btn}
            onPress={() => navigation.navigate("Home")}>
            <FontAwesome name='home' size={20} color={"black"} style={styles.icon} />
          </Pressable>
        </View>

      </ScrollView>

    </View>






    /*  </KeyboardAvoidingView> */

  );
}





















