
import * as Print from 'expo-print';






const PdfList = async (list , ref, lastUpdate, today) => {

  var batteryList;

     for (let i in list) {

      const item = list[i];

      // console.log(item.id_bty)

       var desvio = ((( item.condutancia_bty - ref) / ref) * 100).toFixed(0) ;
        
       var status ;

        if(desvio <= -20 && desvio > -44 ){
         
           status = "yellow";
          

        }else if ( desvio <= -45){
         
           status = "red";

        }else{

           status = "green";
        }



         batteryList = batteryList +
        ` 
          <tr>
              <td>${item.id_bty}</td>
              <td>${item.tensao_bty}</td>
              <td>${item.condutancia_bty}</td>                     
              <td>${desvio}</td> 
              <td>${item.obs_bty}</td>

              <td style="
              display: flex;
              justify-content: center;">
              <div 
              style="
              width:50px;
              height:50px;
              border-radius:50px;                           
              background-color:${status}"
              >
              </div>
              </td>

              <td 
              style="              
               font-size: 20px;             
               color:${status}"
               >               
               &#128246;
               </td>
           </tr>     
         `
        


     }




   /* 
     const htmlContent = `
      <html>
        <body>
          <h1>Hello from React Native!</h1>
          <p>This is a test print.</p>
        </body>
      </html>
    `;
    */
    
  
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
                        
            div {
             width: 1000px;
             height: 800px;            
             padding: 20px;         
             margin-top: 80px
            }

            table {
             height: auto;
             width: 98%;
             padding: 5px;
             border-collapse: separate;
             border-spacing: 2px;             
             margin: 10px;
           }


           th {
            font-size: 1.6em;
            text-transform: capitalize;
            color: black;
            background-color: white;
           }


           tr,
           td {
            border: 2px solid black;
            text-align: center;
            font-family: 'Open Sans', sans-serif;
            font-weight: bold;
            font-size: 1.1em;
            line-height: 1.66667em;
            color: black;
            text-transform: capitalize;
            padding: 2px;
           }

          </style>  
   
        </head>
      

        <body style="text-align: center;">         
         
        
        <main>         

          <div>


            <table>               

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
                 <td colspan="1" rowspan="3">Obs</td>
                 <td colspan="1" rowspan="3">Status</td>
                 <td colspan="1" rowspan="3">Sign</td>
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
    `
   

   try {
        await Print.printAsync({
          html: html, // Or uri: 'path/to/your/pdf.pdf'
          // Optional: printerUrl: selectedPrinter?.url, // iOS only
        });
      } catch (error) {
        console.error('Printing failed:', error);
      }


};
export default PdfList;




/*  transform: rotate(-90deg); */