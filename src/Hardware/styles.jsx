import { StyleSheet } from 'react-native';





export default StyleSheet.create({



   containerLoading: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      paddingBottom: 200,
      justifyContent: 'center',
      alignItems: 'center'
   },


   


 main:{
   flex:1, 
   padding:10,
   height:'auto' ,
   paddingTop:30 ,
   paddingBottom:30 
 },

 header:{
   flexDirection:'row',
   justifyContent:'center',
   width: "auto",
   height: "auto",
   padding: 12,     
   margin: 2,
   borderRadius:10,
   backgroundColor:'#579f79'
 },

 


  textHeader: {
   fontSize: 16,
   color: 'black',
   fontWeight: 'bold',
},






container:{
   flexDirection:'column',
   padding:10,   
},
  


content:{
   flexDirection:'column',
   marginBottom:10,   
   alignItems:'center',   
   padding:20,
   backgroundColor:'#579f79',
   borderRadius:10,
},  




textContent: {
   fontSize: 16,
   color: 'black',
   fontWeight: 'bold',
},




textInfo:{
   fontSize: 14,
   color: 'black',   
},


textRef:{
   fontSize: 16,
   color: 'black',
   fontWeight: 'bold',
},




   
box:{
   flexDirection:'row',
   justifyContent:'space-between',
   width:'90%',
   marginTop:10,
   marginBottom:10
},




icon:{
  marginRight:10, 
},



input: {
   width: '20%',
   height: 50,
   marginBottom: 16,
   padding: 6,
   borderBottomWidth: 1,
   borderBottomColor: "#44E8C3",
   borderRadius: 10,
   color: "#44E8C3",
   backgroundColor: '#062531',
   fontSize: 16,
   textAlign:'center'
 },

 


 boxBtn: {
   width:'auto',
   height:'auto',
   flexDirection:'row',
   justifyContent:'center',
   padding:10, 
   borderRadius:6,
   margin:10,  
   marginTop:30,      
   marginBottom:20,
   backgroundColor:'#579f79',
 },



   btn: {     
       height: 'auto',
       width: 'auto',
       padding: 10,
       backgroundColor: 'gray',
       borderRadius: 10,
       alignItems: 'center'
   },



});