
// npm install -g npm@11.4.1

import {
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  ScrollView,
  Dimensions
} from 'react-native';


import React, { useContext, useEffect, useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';


import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../Contexts/auth';

import Chart from '../Chart';

import PdfList from '../PdfList';
import PdfReport from '../PdfReport';




import styles from './styles';

//import { LinearGradient } from 'expo-linear-gradient';

import { RadioButton } from 'react-native-paper';
// npm i react-native-paper

//import * as Print from 'expo-print';


// export default  Home = () => {
export default function Home({ navigation }) {



  var dta = new Date();
  var dd = dta.getDate().toString().padStart(2, '0');
  var mm = (dta.getMonth() + 1).toString().padStart(2, '0');
  var yyyy = dta.getFullYear();
  var today = yyyy + "-" + mm + "-" + dd;

  const lastUpdate = 15;
  const ref = 3989;

  const {
    endpoint
  } = useContext(AuthContext);


  useEffect(() => {
    getListBattery();
  }, []);


  const [isLoading, setIsLoading] = useState(false);

  const [isListOne, setIsListOne] = useState(false);

  const [isListTwo, setIsListTwo] = useState(false);

  const [error, setError] = useState("");

  const [listBattery, setListBattery] = useState([]);

  const [atention, setAtention] = useState("");

  const [critical, setCritical] = useState("");

  const selectList = [];

  //const [graphicModal, setGraphicModal] = useState(false);

  //const [graphicData, setGraphicData] = useState([]);

  //const dataArray = [];

  //const screenWidth = Dimensions.get('window').width;

  const [report, setReport] = useState([]);

  const [itensSelectList, setItensSelectList] = useState([]);

  const [fkStation, setFkStation] = useState("");

  const [opacity, setOpacity] = useState(0.3);

  const [valueBattery, setValueBattery] = useState('all');
  const [searchBattery, setSearchBattery] = useState(false);

  const [batterytSearch, setBatterySearch] = useState('');
  const [batteryFilter, setBatteryFilter] = useState();

  const handleBattery = (value) => {
    setBatterySearch(value);
    const filters = listBattery.filter((item) =>
      item.id_bty.toString().toLowerCase().includes(value.toLowerCase())
    );
    setBatteryFilter(filters);
  };

  const getRadioBattery = (value) => {
    switch (value) {
      case 'worst':
        const filters = listBattery.filter((item) =>
          (((item.condutancia_bty - ref) / ref) * 100).toFixed(0) <= -20
        );
        setBatteryFilter(filters);
        setSearchBattery(false);
        setOpacity(0.3);
        break;
      case 'all':
        getListBattery();
        setSearchBattery(false);
        setOpacity(0.3);
        break;
      case 'searchId':
        setSearchBattery(true);
        setOpacity(1);
        break;
    }
  }






  const [valueReport, setValueReport] = useState('all');
  const [searchReport, setSearchReport] = useState(false);

  const [reportSearch, setReportSearch] = useState('');
  const [reportFilter, setReportFilter] = useState();

  const handleReport = (value) => {
    setReportSearch(value);
    const filters = report.filter((item) =>
      item.date_anl.toLowerCase().includes(removeString(value.toLowerCase()))
    );
    setReportFilter(filters);
  };



  const getRadioReport = (value) => {
    switch (value) {
      case 'last':
        const filters = report.slice(-1);
        setReportFilter(filters);
        setSearchReport(false);
        setOpacity(0.3);
        break;
      case 'all':
        getListAnalysisByFk();
        setSearchReport(false);
        setOpacity(0.3);
        break;
      case 'searchDate':
        setSearchReport(true);
        setOpacity(1);
        break;
    }
  }


  /*
  const surchLast = () => {
    const filters = report.slice(-1)
    setReportFilter(filters);
  };
  */


  /*
  const cleanSurch = (value) => {
    if (value == "one") {
      getListBattery();
    } else {
      getListAnalysisByFk();
    }
  };
 */





  const getDiffInDays = (date) => {
    let lastRead = new Date(date);
    let dlastRead = lastRead.getDate().toString().padStart(2, '0');
    let mlastRead = (lastRead.getMonth() + 1).toString().padStart(2, '0');
    let ylastRead = lastRead.getFullYear();
    let lastReadf = ylastRead + "-" + mlastRead + "-" + dlastRead;

    let diffInMs = new Date(today) - new Date(lastReadf)
    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
  }


  const removeString = (value) => {
    return value.replace(/[^0-9]/g, '');
  }



  /* line chart*/
  const labels = [];
  const [label, setLabel] = useState([]);

  const datasets = [];
  const [dataset, setDataset] = useState([]);

  const data = {
    labels: label,
    datasets: [
      {
        data: dataset
        // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        // strokeWidth: 2 // optional       
      }
    ]
  };












  const getListBattery = async () => {

    await fetch(endpoint + "?action=list_battery")
      .then((res) => res.json())
      .then(
        (result) => {

          // console.log(result);

          // setIsLoading(false);

          if (result != "notfound") {

            setIsLoading(false);

            setIsListOne(true);

            setListBattery(result);
            setBatteryFilter(result);

            var count = Object.keys(result).length;

            for (var i = 0; i < count; i++) {

              /*
              let lastRead = new Date(result[i].update_bty);  
              let dlastRead = lastRead.getDate().toString().padStart(2, '0');
              let mlastRead = (lastRead.getMonth() + 1).toString().padStart(2, '0');
              let ylastRead = lastRead.getFullYear();
              let lastReadf = ylastRead+"-"+mlastRead+"-"+dlastRead;		
              let diffInMs   = new Date(today) - new Date(lastReadf)
              let diffInDays = diffInMs / (1000 * 60 * 60 * 24);             
              //console.log(diffInDays); 
              result[i].update_bty = diffInDays;
              */

              result[i].update_bty = getDiffInDays(result[i].update_bty);

              let dif = result[i].condutancia_bty - ref;
              let desvio = (dif / ref * 100).toFixed(0);

              if (desvio <= -20 && desvio >= -44) {

                setAtention(`Atenção ${desvio}% id ${result[i].id_bty}`);

              } else if (desvio <= -45) {

                setCritical(`Critico ${desvio}% id ${result[i].id_bty}`);
              }

              /*
              if (result[i].condutancia_bty <= 4000) {
                setCritical(`Critico ${result[i].condutancia_bty} id ${result[i].id_bty}`);
              } else if (result[i].condutancia_bty > 4000 && result[i].condutancia_bty <= 4200) {
                setAtention(`Atenção ${result[i].condutancia_bty} id ${result[i].id_bty}`);
              }
              */

              /*  
              dataArray.push({
                labels: [result[i].id_bty],
                datasets: [dif / ref * 100]
              });
              */

              labels.push(result[i].id_bty);
              datasets.push(dif / ref * 100);

              selectList.push({
                value: "Battery nº " + result[i].id_bty
              })

            }

            setLabel(labels);
            setDataset(datasets);

            // setGraphicData(dataArray);

            setItensSelectList(selectList);

          } else {

            setIsListOne(false);
            setError(result);
          }

        })
      .catch(function (error) {
        console.log('erro => ' + error.message);
      });
  }









  const getListAnalysisByFk = async () => {

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
            setReportFilter(result);
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







  const pdfList = () => {
    PdfList(batteryFilter, ref, lastUpdate, today);
  }


  const pdfReport = () => {
    PdfReport(reportFilter, today);
  }










  /*
  const createDynamicListOne = () => {
    
    var batteryList;

    for (let i in batteryFilter) {
      const item = batteryFilter[i];

      batteryList = batteryList +
        ` 
          <tr>
              <td>${item.id_bty}</td>
              <td>${item.tensao_bty}</td>
              <td>${item.condutancia_bty}</td>         
              <td>${item.obs_bty}</td>
              <td>${(((item.condutancia_bty - ref) / ref) * 100).toFixed(0)}</td> 
              <td>${item.update_bty}</td>
           </tr>     
         `
    }

    const html =
      `
      <!DOCTYPE html> 

      <html>

        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  
          <style>

            body{
            padding: 0;
            margin: 0;
            text-align: center;    
            }
                        
            #div {
             width: 1000px;
             height: 800px;
             background-color: rgba(27, 59, 78, 1);
             background-image: linear-gradient(to bottom, transparent, rgba(27, 59, 78, 0.5));
             padding: 20px;
             margin-left: 10px;
             margin-top: 80px
            }

            table {
             height: auto;
             width: 98%;
             padding: 5px;
             border-collapse: separate;
             border-spacing: 2px;
             background-color: rgba(0, 0, 0, 0.3);
             margin: 10px;
           }

           th {
            font-size: 1.6em;
            text-transform: capitalize;
            color: rgba(221, 240, 210, 0.9);
            background-color: black;
           }

           tr,
           td {
            border: 2px solid black;
            text-align: center;
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
            font-size: 1.1em;
            line-height: 1.66667em;
            color: rgba(256, 234, 211, 0.8);
            text-transform: capitalize;
            padding: 2px;
           }

          </style>  
   
        </head>
      
        <body style="text-align: center;">         
         
          <header>
            <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
              Analisador de Baterias Estacionárias
            </h1>
          </header>

        <main>         

          <div id="div">

            <table> 

               <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col style="background-color: rgba(17, 19, 88,1);" />
                <col />
                <col />
                <col style="background-color: rgba(17, 19, 88,1);" />
                <col />
                <col />
                <col />
                <col style="background-color: rgba(147, 09, 18,1);" />
                <col />
                <col />
                <col style="background-color: rgba(147, 09, 18,1);" />
                <col />
                <col />
                <col />
                <col style="background-color: rgba(47, 109, 118,1);" />
              </colgroup> 

              <thead>

                <tr>
                  <td colspan="20">${today}</td>
                </tr>

                <tr>
                  <th colspan="20">Lista de Baterias</th>
                </tr>

                <tr>
                 <td colspan="1" rowspan="3">ID</td>
                 <td colspan="1" rowspan="3">Tensão</td>
                 <td colspan="1" rowspan="3">Condutância</td>
                 <td colspan="1" rowspan="3">Desvio</td>
                 <td colspan="14" style="background-color: rgba(27, 59, 78,1);">Status</td>
                 <td colspan="1" rowspan="3">Sign</td>
               </tr>

               <tr>
                 <td colspan="7">Dinheiro</td>
                 <td colspan="7">Cartão</td>
               </tr>

               <tr>
                 <td colspan="3">qtd</td>
                 <td colspan="4">valor</td>
                 <td colspan="3">qtd</td>
                 <td colspan="4">valor</td>
               </tr> 

              </thead> 

              <tbody id="tbody" style="color:white"> 

                <tr>
                  ${batteryList}
                </tr>  

              </tbody>           

            </table>

          </div> 
           
        </main>         
          
        <footer></footer>

        </body>

      </html>        
    `;
    return html;
  }
 */







  if (isLoading) {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Starting software...</Text>
      </View>
    )
  }




  return (
    /* 
       <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}      
       >
      */

    <View style={styles.main}>

      <View style={styles.header}>
        <Text style={styles.textWarning}>Analisador de Baterias Estacionárias</Text>
      </View>

      <ScrollView>

        <View style={styles.containerHeader}>

          <View style={styles.containerWarning}>
            <Text style={styles.attentionWarning}>{atention}</Text>
            <Text style={styles.criticalWarning}>{critical}</Text>
          </View>



          <View style={styles.boxBtn}>

            {/* 
            <Pressable
              style={{
                height: 'auto',
                width: 'auto',
                padding: 14,
                backgroundColor: 'gray',
                borderRadius: 10,
                alignItems: 'center'
              }}
              onPress={() => navigation.navigate("Graph")}>              
              <FontAwesome name='line-chart' size={20} color={"black"} />
            </Pressable>
         */}


            <Pressable
              style={{
                height: 'auto',
                width: 'auto',
                padding: 14,
                backgroundColor: 'gray',
                borderRadius: 10,
                alignItems: 'center'
              }}
              onPress={() => navigation.navigate("Hardware")}>
              <FontAwesome name='microchip' size={20} color={"black"} />
            </Pressable>



            <Pressable
              style={{
                height: 'auto',
                width: 'auto',
                padding: 14,
                backgroundColor: 'gray',
                borderRadius: 10,
                alignItems: 'center'
              }}
              onPress={() => pdfList()}>
              <FontAwesome name='file-pdf-o' size={20} color={"red"} />
            </Pressable>


          </View>



        </View>



        <View style={styles.containerSearch}>

          <View style={styles.boxRadio}>

            <RadioButton.Group

              onValueChange={newValue => getRadioBattery(newValue) & setValueBattery(newValue)}

              value={valueBattery}>

              <RadioButton.Item label="All" value="all" />
              <RadioButton.Item label="Atention" value="worst" />
              <RadioButton.Item label="Ref By Id" value="searchId" />

            </RadioButton.Group>

          </View>

          <View style={{
            width: 'auto',
            height: 'auto',
            padding: 8,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            opacity: opacity
          }}>
            <FontAwesome name='search' size={14} color={"black"} />
            <TextInput
              style={{ marginLeft: 10, width: 70 }}
              placeholder="Pesquisar..."
              value={batterytSearch}
              onChangeText={handleBattery}
              editable={searchBattery}
            />
          </View>

        </View>

        <View style={styles.contentList}>

          <View style={styles.headerList}>

            <View style={{ width: 'auto', padding: 5 }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {`id`}
              </Text>
            </View>

            <View style={{ width: 'auto', padding: 5 }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {`tensao`}
              </Text>
            </View>

            <View style={{ width: 80, padding: 5 }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {`condutancia`}
              </Text>
            </View>

            <View style={{ width: 'auto', padding: 5 }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {`desvio`}
              </Text>
            </View>

            <View style={{ width: 70, padding: 5 }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {`obs`}
              </Text>
            </View>

            <View style={{ width: 'auto', padding: 5 }}>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>
                {`Status`}
              </Text>
            </View>

            <View style={{ width: 'auto', padding: 5, textAlign: 'center' }}>
              <Text style={{ fontSize: 10 }}>
                {`Sign`}
              </Text>
            </View>

          </View>



          {
            isListOne
              ?
              <View>
                {batteryFilter.map((item) => (

                  <View key={item.id_bty} style={styles.dataList}>

                    <View style={styles.cardList}>

                      <View style={{ width: 'auto', padding: 5 }}>
                        <Text style={{ fontSize: 10, textAlign: 'center' }}>
                          {/*   {`${item.id_bty}`} */}
                          {key = item.id_bty}
                        </Text>
                      </View>

                      <View style={{ width: 'auto', padding: 5 }}>
                        <Text style={{ fontSize: 10, textAlign: 'center' }}>
                          {`${item.tensao_bty}`}
                        </Text>
                      </View>

                      <View style={{ width: 80, padding: 5 }}>
                        <Text style={{ fontSize: 10, textAlign: 'center' }}>
                          {`${item.condutancia_bty}`}
                        </Text>
                      </View>

                      <View style={{ width: 'auto', padding: 5 }}>
                        <Text style={{ fontSize: 10, textAlign: 'center' }}>
                          {`${(((item.condutancia_bty - ref) / ref) * 100).toFixed(0)}%`}
                        </Text>
                      </View>

                      <View style={{ width: 70, padding: 5 }}>
                        <Text style={{ fontSize: 10, textAlign: 'center' }}>
                          {`${item.obs_bty}`}
                        </Text>
                      </View>

                      {
                        (((item.condutancia_bty - ref) / ref) * 100).toFixed(0) <= -20
                          && (((item.condutancia_bty - ref) / ref) * 100).toFixed(0) > -44
                          ?
                          <View style={styles.statusWarning}></View>
                          :
                          (((item.condutancia_bty - ref) / ref) * 100).toFixed(0) <= -45
                            ?
                            <View style={styles.statusAlert}></View>
                            :
                            <View style={styles.statusOk}></View>
                      }

                      {
                        item.update_bty >= lastUpdate
                          ?
                          <FontAwesome name='signal' size={20} color={"gray"} />
                          :
                          <FontAwesome name='signal' size={20} color={"green"} />
                      }

                    </View>

                  </View>

                ))
                }
              </View>
              :
              <View style={styles.contentWarning}>
                <Text style={styles.textWarning}>{error}</Text>
              </View>
          }

        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <FontAwesome name='line-chart' size={20} color={"black"} />
          <Text style={styles.textBtn}>% Desvio</Text>
        </View>



        <Chart value={data} />
        {/* 
         

        <View>

          <Text style={{ textAlign: 'center', fontSize: 18 }}>Graphic</Text>

          <LineChart
            width={screenWidth}
            height={400}
            data={graphicData}

            style={{
              flex: 1,
              height: 'auto',
              width: 'auto',
              paddingTop: 40,
              paddingRight: 40,
              paddingBottom: 40,
            }}>

            <CartesianGrid strokeDasharray="3 3" />

            <CartesianGrid stroke="#4d0707ff" />

            <XAxis dataKey="labels" />

            <YAxis />

            <Line type="monotone" dataKey="datasets" stroke="#05162bff" />

          </LineChart>

        </View>

      */}





        <View style={styles.containerSearch}>

          <View style={styles.boxSelect}>

            <SelectList

              setSelected={(key) =>
                setFkStation(removeString(key))
              }

              data={itensSelectList}
              save="key"
              placeholder='Select Battery'

              onSelect={getListAnalysisByFk}

              //placeholderTextColor='#44E8C3'
              // boxStyles={{color:'#44E8C3'}}        
              // dropdownItemStyles={{color:'#44E8C3'}}

              dropdownStyles={{
                backgroundColor: '#b4beb9',
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 8
              }}

              /*
               dropdownItemStyles={{
                backgroundColor: 'red',
                borderRadius:6
              }}
              */

              boxStyles={{ backgroundColor: '#b4beb9' }}
              inputStyles={{ color: '#000000' }}
              //dropdownTextStyles={{ color: '#44E8C3' }}
              dropdownTextStyles={{ color: 'black' }}

            />

          </View>


          <View>

            <Pressable
              style={{
                height: 'auto',
                width: 'auto',
                padding: 14,
                backgroundColor: 'gray',
                borderRadius: 10,
                alignItems: 'center'
              }}
              onPress={() => pdfReport()}>
              <FontAwesome name='file-pdf-o' size={20} color={"red"} />
            </Pressable>

          </View>

        </View>




        <View style={styles.containerSearch}>

          <View style={styles.boxRadio}>

            <RadioButton.Group

              onValueChange={newValue => getRadioReport(newValue) & setValueReport(newValue)}

              value={valueReport}>

              <RadioButton.Item label="All" value="all" />
              <RadioButton.Item label="Last" value="last" />
              <RadioButton.Item label="Ref By Date" value="searchDate" />

            </RadioButton.Group>

          </View>


          <View style={{
            width: 'auto',
            height: 'auto',
            padding: 8,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            opacity: opacity
          }}>
            <FontAwesome name='search' size={14} color={"black"} />
            <TextInput
              style={{ marginLeft: 10, width: 70 }}
              placeholder="Pesquisar..."
              value={reportSearch}
              onChangeText={handleReport}
              editable={searchReport}
            />
          </View>

        </View>



        {
          isListTwo
            ?


            /*      

           <FlatList
             data={reportFilter}
             data={report}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) =>

           */


            <View>

              {reportFilter.map((item) => (


                <View key={item.id_anl}>

                  <View style={styles.cardListVertical}>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Id`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.id_anl}`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Tensão`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.tensao_anl}`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Corrente`}
                      </Text>
                      <Text style={{ fontSize: 12, textAlign: 'center' }}>
                        {`${item.corrente_anl}`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Temperatura`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.temperatura_anl}º`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Obs`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.obs_anl}`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Date`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.date_anl}`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Time`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.time_anl}`}
                      </Text>
                    </View>

                    <View style={styles.card}>
                      <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: 'bold', }}>
                        {`Fk`}
                      </Text>
                      <Text style={{ fontSize: 10, textAlign: 'center' }}>
                        {`${item.fk_bty}`}
                      </Text>
                    </View>

                  </View>

                </View>

              ))}

            </View>



            /* 
                          }
                        >
                        </FlatList>
            
             */


            :

            <View>
              <Text style={styles.textWarning}>{error}</Text>
            </View>

        }


      </ScrollView>




      {/* 

      <Modal
        animationType='fade'
        visible={graphicModal}
      >


        <LineChart
          width={screenWidth}
          height={400}
          data={graphicData}

          style={{
            flex: 1,
            height: 'auto',
            width: 'auto',
            paddingRight: 30,
            paddingTop: 100,
            paddingBottom: 100,
            backgroundColor: 'black',
          }}>

          *  <CartesianGrid strokeDasharray="3 3" />  *

          <CartesianGrid stroke="#f5f5f5" />

          <XAxis dataKey="labels" />

          <YAxis />

          <Line type="monotone" dataKey="datasets" stroke="#648fc0ff" />

        </LineChart>


        <Pressable

          style={{
            height: 'auto',
            width: 100,
            padding: 10,
            backgroundColor: '#579f79',
            borderRadius: 6,
            margin: 10,
            alignItems: 'center'
          }}
          // onPress={() => navigation.navigate("Graph")}>

          onPress={() => setGraphicModal(false)}>

          <FontAwesome name='home' size={20} color={"black"} style={styles.icon} />

        </Pressable>

      </Modal>
      */}



    </View>

    /*  </KeyboardAvoidingView>   */

  );


};










/*

  <View style={styles.containerBtn}>

    <View>
      <Pressable
        style={{
          height: 'auto',
          width: 'auto',
          padding: 8,
          backgroundColor: 'gray',
          borderRadius: 10,
          alignItems: 'center'
        }}
        onPress={() => surchLast()}>
        <FontAwesome name='sort-amount-asc' size={20} color={"black"} />
      </Pressable>
    </View>



    <View>
      <Pressable
        style={{
          height: 'auto',
          width: 'auto',
          padding: 8,
          backgroundColor: 'gray',
          borderRadius: 10,
          alignItems: 'center'
        }}
        onPress={() => cleanSurch("two")}>
        <FontAwesome name='arrow-left' size={20} color={"black"} />
      </Pressable>
    </View>



    <View style={styles.boxSurch}>
      <FontAwesome name='search' size={14} color={"black"} />
      <TextInput
        style={{ marginLeft: 10, width: 70 }}
        placeholder="Pesquisar..."
        value={reportSearch}
        onChangeText={handleReport}
      />
    </View>


  </View>



   
    <View style={styles.headerList}>

      <View style={{ width: 'auto', padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>
          {`id`}
        </Text>
      </View>

      <View style={{ width: 'auto', padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>              
         {`tensao`}
        </Text>
      </View>
       
      <View style={{ width: 'auto', padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>  
          {`corrente`}
        </Text>
      </View>

      <View style={{ width: 80, padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>  
         {`temperatura`}
        </Text>
      </View>

      <View style={{ width: 80, padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>  
         {`obs`}
        </Text>
      </View>

      <View style={{ width: 'auto', padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>               
          {`date`}
        </Text>
      </View>
 
      <View style={{ width: 'auto', padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>  
          {`time`}
        </Text>
      </View>
     
      <View style={{ width: 'auto', padding:5 }}>
        <Text style={{fontSize: 10 , textAlign:'center'}}>  
         {`fk`}
        </Text>
      </View>

    </View>







    <View style={styles.container}>

  <View style={styles.containerHeader}>

       <TextInput
          placeholder="Pesquisar..."
          value={textoPesquisa}
          onChangeText={handlePesquisa}
        />
  </View>              

  <View style={styles.dataList}>

    <View style={styles.cardList}>
       <FlatList

        data={itensFiltrados}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (

        <Text style={{ width: 100, marginLeft: 4, fontSize: 8 }}>{item.nome}</Text>

        )}
      />

    </View>

  </View>  

</View>
 

*/