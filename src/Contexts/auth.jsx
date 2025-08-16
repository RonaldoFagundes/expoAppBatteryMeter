import React ,{
    createContext,
    useState
} from 'react';


export const AuthContext = createContext({});

function AuthProvider({children}){


 const [hardwareStatus, sethardwareStatus] = useState(false);

 const [idPlace,setIdPlace] = useState ("");
 
 
 //const endpoint  = "http://localhost:3322";

 const endpoint  = "https://batterymeter.inovemais.tec.br/api/";
 

    return(
        <AuthContext.Provider value={
             {
              endpoint,              
              hardwareStatus, sethardwareStatus,
              idPlace,setIdPlace             
             }}>
          {children}
        </AuthContext.Provider>
  )
}
export default AuthProvider;