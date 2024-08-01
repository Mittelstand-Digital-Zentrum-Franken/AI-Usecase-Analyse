import { cookies } from 'next/headers'
import { getToken } from '@/app/apiToken';

const baseUrl = process.env.API_BASE_URL
const token =  await getToken();




export async function GET(req,res) {
  
    try{
      
      const { searchParams } = new URL(req.url);
      const usecase_id = searchParams.get("usecase_id");

      const cookieStore = cookies();
       // const user = cookieStore.get("user_id").value;
       const user = 0;
   
       const Url = `${baseUrl}api/get_valuescore_for_usecase`;
       const urlWithParams = `${Url}?user_id=${user}&usecase_id=${usecase_id}`;
  
   
  
   
     
         const response = await fetch(urlWithParams, {
           method: "GET",
           headers: new Headers({
            authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
            
          }),
          
         });
         
   
         const data = await response.json();
         return Response.json({data})
      }  catch (error) {
       console.error("Error:", error);
       res.status(500).json({ error: "Internal Server Error" });
     }
    
  
 
     
   }

 
   
   export async function POST(req, res) {
    try {
      const bodyData = await req.json();
      const { usecase_id, alignment, savings, advantages } = bodyData;
      const cookieStore = cookies();
      //const user = cookieStore.get("user_id").value;
      const user = "0";
      let Url = null;
     
      Url = `${baseUrl}api/create_valuescore`;
      const queryParams = new URLSearchParams({
        user_id: user,
        usecase_id: usecase_id,
        alignment: alignment,
        savings: savings
      });
      const urlWithParams = `${Url}?${queryParams}`;
  
      const response = await fetch(urlWithParams, {
        method: "POST",
        headers: new Headers({
          authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
          
        }),
        
      body: JSON.stringify( advantages)
      });
      const response_data = await response.json();
     
      // Check if the response status is OK (200)
      if (response.status == 200) {
       
       return Response.json({ response_data })
          } else {
        throw new Error("Failed to fetch"); // Throw an error if the response status is not OK
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }