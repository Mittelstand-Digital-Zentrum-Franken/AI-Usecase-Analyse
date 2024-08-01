import { cookies } from 'next/headers'
import { getToken } from '@/app/apiToken';

const baseUrl = process.env.API_BASE_URL
const token =  await getToken();



export async function DELETE(req,res) {
  
    try{
      
      const { searchParams } = new URL(req.url);
      const org_id = searchParams.get('org_id');
   const cookieStore = cookies();
     const user = "0";
    // const user = cookieStore.get("user_id").value;
    const Url = `${baseUrl}api/delete_organization`;
        const urlWithParams = `${Url}?user_id=${user}&org_id=${org_id}`;
 
   
       const response = await fetch(urlWithParams, {
         method: "DELETE",
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

export async function GET(req,res) {
  
    try{
     const cookieStore = cookies();
     //const user = cookieStore.get("user_id").value;
     const user = "0";
     let Url = null;
     Url = `${baseUrl}api/get_organizations`;
     const queryParams = new URLSearchParams({
       user_id: user,
     });
     const urlWithParams = `${Url}?${queryParams}`;
 
   
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
   export async function PUT(req, res) {
     try {
      const { searchParams } = new URL(req.url);
    
      const org_id = searchParams.get('org_id');
      const bodyData = await req.json();
      const {  name } = bodyData;      
       const cookieStore = cookies();
       //const user_id = cookieStore.get("user_id").value;
       const user_id = "0";
       let Url = null;
   
     
       Url = `${baseUrl}api/update_organization`;
       const queryParams = new URLSearchParams({
        user_id: user_id,
       org_id: org_id,
       
         name: name
       });
       const urlWithParams = `${Url}?${queryParams}`;
       const response = await fetch(urlWithParams, {
        method: "PUT",
        headers: new Headers({
          authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
          
        }),
       
      });
  
   
       // Check if the response status is OK (200)
       if (response.status == 200) {
        
         return Response.json(response.status)
       } else {
         throw new Error("Failed to fetch"); // Throw an error if the response status is not OK
       }
     } catch (error) {
       console.error("Error:", error);
       res.status(500).json({ error: "Internal Server Error" });
     }
   }
   
 
   
   export async function POST(req, res) {
     try {
       const bodyData = await req.json();
       const cookieStore = cookies();
       const user = "0";//cookieStore.get("user_id").value;
       let Url = null;
   
      
       Url = `${baseUrl}api/create_organization`;
       const queryParams = new URLSearchParams({
         user_id: user,
         name: bodyData.name
       });
       const urlWithParams = `${Url}?${queryParams}`;
   
       const response = await fetch(urlWithParams, {
         method: "POST",
         headers: new Headers({
          authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
          
        }),
       });
   
       // Check if the response status is OK (200)
       if (response.status == 200) {
        
         return Response.json(response.status)
       } else {
         throw new Error("Failed to fetch"); // Throw an error if the response status is not OK
       }
     } catch (error) {
       console.error("Error:", error);
       res.status(500).json({ error: "Internal Server Error" });
     }
   }


   
   export async function PATCH(req, res) {
    try {
   
     const bodyData = await req.json();
     const {  invite_code } = bodyData;      
      const cookieStore = cookies();
      //const user_id = cookieStore.get("user_id").value;
      const user_id = "0";
      let Url = null;
  
    
      Url = `${baseUrl}api/join_organization`;
      const queryParams = new URLSearchParams({
       user_id: user_id,
       invite_code: invite_code,
      
      });
      const urlWithParams = `${Url}?${queryParams}`;
      const response = await fetch(urlWithParams, {
       method: "PATCH",
       headers: new Headers({
        authorization: `Bearer ${token}`, 
        "Content-Type": "application/json"
        
      }),
      
     });
 
  
      // Check if the response status is OK (200)
      if (response.status == 200) {
       
        return Response.json(response.status)
      } else {
        throw new Error("Failed to fetch"); // Throw an error if the response status is not OK
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }