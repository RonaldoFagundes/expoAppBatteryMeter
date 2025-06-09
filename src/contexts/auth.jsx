import React ,{
    createContext,
    useState
} from 'react';


export const AuthContext = createContext({});


function AuthProvider({children}){


 const [hardwareStatus, sethardwareStatus] = useState(false);

 const [idPlace,setIdPlace] = useState ("");



 
 const endpoint  = "http://localhost:3322";
 //const endpointPhp = "https://app.ehsss.com.br";

/*
 const [load, setLoad] = useState(true);
 const [day, setDay] = useState(true);

 const [imgTags, setImgTags] = useState([]);
 const [imgTagsSelected, setImgTagsSelected] = useState();

 const [tags, setTags] = useState({
  id:"",
  status:"",
  desc:"",
  img:null,   
});


 const [idConstruction,setIdConstruction] = useState (""); 
 const [nameConstruction,setNameConstruction] = useState ("");  
 const [enterpriseConstruction,setEnterpriseConstruction] = useState ("");  
 const [addressConstruction,setAddressConstruction] = useState (""); 
 const [imgConstruction,setImgConstruction] = useState ("");

 const [constructions, setConstructions] = useState({
  id:"",
  name:"",
  enterprise:"",
  address:"",
  img:null,   
});


const [idReport, setIdReport] = useState ("");
const [reportNumber, setReportNumber] = useState ("");
const [reportStatus, setReportStatus] = useState ("");
const [reportData, setReportData] = useState([]);
const [newReportNumber, setNewReportNumber] = useState();


const [report, setReport] = useState({
  id:"",
  number:"",
  status:"",  
});


const [detailsCompany, setDetailsCompany] = useState ({
  name:"",
  address:"",
  postal_cod:"",
  state:"",
  country:"",
  phone:"",
  web_site:"",
  img:null,
  logo:null,   
  icon:null,  
}); 
 
*/

    return(
        <AuthContext.Provider value={
             {
              endpoint,
              
              hardwareStatus, sethardwareStatus,
              idPlace,setIdPlace
              /*
              endpointPhp,
              setLoad,  load,
              setDay,  day,     
              setIdConstruction, idConstruction ,
              setNameConstruction, nameConstruction,
              setEnterpriseConstruction,enterpriseConstruction,
              setAddressConstruction, addressConstruction,
              setImgConstruction , imgConstruction,
              setConstructions , constructions, 
              setIdReport, idReport,
              setReportNumber,reportNumber,
              setReportStatus , reportStatus,
              setReportData,reportData, 
              setReport , report, 
              setDetailsCompany ,detailsCompany,
              setNewReportNumber,newReportNumber,
              setTags , tags,              
              setImgTags , imgTags,
              setImgTagsSelected, imgTagsSelected,
              */
             
              
             }}>
          {children}
        </AuthContext.Provider>
  )
}
export default AuthProvider;