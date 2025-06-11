
// npm install -g npm@11.4.1

import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal
} from 'react-native';


import React, { useContext, useEffect, useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list'

import { LineChart, XAxis, YAxis, CartesianGrid, Line } from 'recharts';

import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../contexts/auth';

import styles from './styles';








// export default  Home = () => {
export default function Home({ navigation }) {




  const {
    endpoint
  } = useContext(AuthContext);




  useEffect(() => {
    getListBattery();

    getStation();
  }, []);


  const [isListOne, setIsListOne] = useState(false);

  const [isListTwo, setIsListTwo] = useState(false);

  const [error, setError] = useState("");

  const [listBattery, setListBattery] = useState([]);

  const [sign, setSign] = useState("");

  const [graphicModal, setGraphicModal] = useState(false);

  const [graphicData, setGraphicData] = useState([]);

  const dataArray = [];




  const [report, setReport] = useState([]);

  const [listStation, setListStation] = useState([]);

  const [fkStation, setFkStation] = useState("");




  const getListBattery = async () => {

    await fetch(endpoint + "?action=list_battery")
      .then((res) => res.json())
      .then(
        (result) => {

          console.log(result);


          if (result != "notfound") {

           

            setIsListOne(true);
            setListBattery(result);

            var count = Object.keys(result).length;

            for (var i = 0; i < count; i++) {

              dataArray.push({
                id: result[i].id_bty,
                res: result[i].condutancia_bty / 5000 * 100,                
              });
            }

            setGraphicData(dataArray);
          } else {

            setIsListOne(false);
            setError(result);
          }

        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });

  }







  const stations = [];


  const getStation = async () => {

    await fetch(endpoint + "?action=list_station")
      .then((res) => res.json())
      .then(
        (result) => {

          // console.log(result);

          var count = Object.keys(result).length;

          for (var i = 0; i < count; i++) {

            stations.push({
              value: result[i].id_sta + " - " + result[i].ref_sta
            })

          }
          setListStation(stations);


        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });
  }





  const selectStation = async () => {

    console.log(fkStation);

    await fetch(endpoint + "?action=list_analysis_by_fk", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fkStation
      })
    })
      .then((res) => res.json())
      .then(

        (result) => {


          if (result != "notfound") {

            setIsListTwo(true);
            setReport(result);

          } else {

            setIsListTwo(false);
            setError(result);

          }


        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });


  }



  const getReport = () => {
    console.log("test");
  }


  /*
    const getReport = async () => {
  
      await fetch(endpoint + "?action=list_analysis")
        .then((res) => res.json())
        .then(
          (result) => {
  
            //  console.log(result);                  
            setReport(result);
          })
        .catch(function (error) {
          console.log('erro => ' + error.message);
        });
    }
  */




  const removeString = (value) => {
    //let formatStr =   value.replace(/[^0-9]/g, '');
    return value.replace(/[^0-9]/g, '');
  }








  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: '100%' }}
    >

      <View style={styles.main}>


        <View style={styles.header}>
          <Text>I9+ Baterias</Text>
        </View>





        <View style={styles.container}>

          <View style={styles.containerHeader}>

            <Pressable
              style={{
                height: 'auto',
                width: 'auto',
                padding: 10,
                backgroundColor: 'beige',
                borderRadius: 10
              }}

              // onPress={() => navigation.navigate("Graph")}>
              onPress={() => setGraphicModal(true)}>

              <Text>Graph</Text>
            </Pressable>

          </View>


          <View style={styles.contentList}>

            <View style={styles.headerList}>

              <Text style={{ width: 30, fontSize: 10 }}>
                {`id`}
              </Text>

              <Text style={{ width: 30, fontSize: 10 ,marginRight:8}}>
                {`tensao`}
              </Text>

              <Text style={{ width: 60, fontSize: 10, marginRight:8 }}>
                {`condutancia`}
              </Text>

              <Text style={{ width: 30,  fontSize: 10, marginRight:8 }}>
                {`desvio`}
              </Text>

              <Text style={{width: 80, fontSize: 10, textAlign:'center' }}>
                {`obs`}
              </Text>

              <Text style={{width: 20, fontSize: 10, textAlign:'center',marginLeft:8 }}>
                {`fk`}
              </Text>

              

               <Text style={{ width: 30, fontSize: 10, textAlign:'center' }}>
                {`Sign`}
              </Text>

              <Text style={{ width: 30, fontSize: 10, marginLeft:8 }}>
                {`Status`}
              </Text>

            </View>

            {
              isListOne
                ?

                <FlatList
                  data={listBattery}
                  renderItem={({ item }) =>

                    <View style={styles.dataList}>

                      <View style={styles.cardList}>

                        <Text style={{ width: 30, fontSize: 8 }}>
                          {`${item.id_bty}`}
                        </Text>

                        <Text style={{ width: 30, fontSize: 8, marginRight:8 }}>
                          {`${item.tensao_bty}`}
                        </Text>

                        <Text style={{ width: 50, fontSize: 8 ,marginRight:18, textAlign:'center'}}>
                          {`${item.condutancia_bty}`}
                        </Text>

                        <Text style={{ width: 30, fontSize: 8 ,marginRight:8, marginRight:8, textAlign:'center'}}>
                          {`${item.desvio_bty}`}
                        </Text>

                        <Text style={{ width: 100, fontSize: 8, textAlign:'center' }}>
                          {`${item.obs_bty}`}
                        </Text>

                        <Text style={{ width:  20 , fontSize: 8 }}>
                          {`${item.fk_sta}`}
                        </Text>


                       



                        {
                          item.id_bty  >  1 ?

                            <FontAwesome name='signal' size={20} color={"green"} />

                            :

                            <FontAwesome name='signal' size={20} color={"gray"} />
                        }


                        {
                          item.condutancia_bty < 4200 && item.condutancia_bty > 3980 ?
                            <View style={styles.statusWarning}></View>

                            :

                            item.condutancia_bty < 3980 ?
                              <View style={styles.statusAlert}></View>

                              :
                              <View style={styles.statusOk}></View>
                        }




                      </View>

                    </View>

                  }
                >
                </FlatList>

                :
                <View style={styles.contentWarning}>
                  <Text style={styles.textWarning}>{error}</Text>
                </View>
            }


          </View>

        </View>





        <View style={styles.container}>

          <View style={styles.containerHeader}>


            <View>

              <SelectList

                setSelected={(key) =>

                  setFkStation(removeString(key))
                }


                data={listStation}
                save="key"
                placeholder='Select Station'
                // onPress={getStation()} 

                onSelect={selectStation}

                //placeholderTextColor='#44E8C3'
                // boxStyles={{color:'#44E8C3'}}        
                // dropdownItemStyles={{color:'#44E8C3'}}


                boxStyles={{ backgroundColor: '#b4beb9' }}
                inputStyles={{ color: '#000000' }}
                //dropdownTextStyles={{ color: '#44E8C3' }}
                dropdownTextStyles={{ color: 'black' }}
              />

            </View>


            {/* 
            <View>
              <Pressable
               style={{
                height: 'auto',
                width: 'auto',
                padding: 10,
                backgroundColor: 'beige',
                borderRadius: 10
               }}
               onPress={() => getReport()}>
               <Text>Report</Text>
              </Pressable>
           </View>
           */}


          </View>




          <View style={styles.contentList}>

            <View style={styles.headerList}>

              <Text style={{ width: 30, marginLeft: 4, fontSize: 10 }}>
                {`id`}
              </Text>

              <Text style={{ width: 100, marginLeft: 4, fontSize: 10 }}>
                {`tensao`}
              </Text>

              <Text style={{ width: 100, marginLeft: 4, fontSize: 10 }}>
                {`corrente`}
              </Text>

              <Text style={{ width: 100, marginLeft: 4, fontSize: 10 }}>
                {`temperatura`}
              </Text>

              <Text style={{ width: 100, marginLeft: 4, fontSize: 10 }}  >
                {`obs`}
              </Text>

              <Text style={{ width: 100, marginLeft: 4, fontSize: 10 }} >
                {`date`}
              </Text>

              <Text style={{ width: 100, marginLeft: 4, fontSize: 10 }}>
                {`time`}
              </Text>

              <Text style={{ width: 30, marginLeft: 4, fontSize: 10 }}>
                {`fk`}
              </Text>

            </View>

            {
              isListTwo
                ?

                <FlatList
                  data={report}
                  renderItem={({ item }) =>

                    <View style={styles.dataList}>

                      <View style={styles.cardList}>

                        <Text style={{ width: 30, marginLeft: 4, fontSize: 8 }}>
                          {`${item.id_anl}`}
                        </Text>

                        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>
                          {`${item.tensao_anl}`}
                        </Text>

                        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>
                          {`${item.corrente_anl}`}
                        </Text>

                        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>
                          {`${item.temperatura_anl}º`}
                        </Text>

                        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>
                          {`${item.obs_anl}`}
                        </Text>

                        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>
                          {`${item.date_anl}`}
                        </Text>

                        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>
                          {`${item.time_anl}`}
                        </Text>

                        <Text style={{ width: 30, marginLeft: 4, fontSize: 8 }}>
                          {`${item.fk_bty}`}
                        </Text>

                      </View>

                    </View>

                  }
                >
                </FlatList>

                :

                <View style={styles.contentWarning}>
                  <Text style={styles.textWarning}>{error}</Text>
                </View>

            }

          </View>

        </View>





        <Modal
          animationType='fade'
          visible={graphicModal}
        >

          <LineChart
            width={400}
            height={200}
            data={graphicData}

            style={{
              flex: 1,
              height: 'auto',
              width: 'auto',
              paddingRight: 30,
              paddingTop: 100,
              paddingBottom: 400,
              backgroundColor: 'black',
            }}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="id" />

            <YAxis />

            <Line type="monotone" dataKey="res" stroke="#8884d8" />

          </LineChart>


          <Pressable

            style={{
              height: 200,
              width: 200,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 10
            }}

            // onPress={() => navigation.navigate("Graph")}>

            onPress={() => setGraphicModal(false)}>

            <Text>Close</Text>

          </Pressable>

        </Modal>






      </View>

    </KeyboardAvoidingView>

  );


};















