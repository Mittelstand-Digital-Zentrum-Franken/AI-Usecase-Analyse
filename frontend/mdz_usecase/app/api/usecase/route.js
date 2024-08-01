import { cookies } from 'next/headers'
import { getToken } from '@/app/apiToken';

const baseUrl = process.env.API_BASE_URL;
const token =  await getToken();

export async function GET(req, res) {
    try {
      
        // Extract query parameters from the request URL
        const { searchParams } = new URL(req.url);
        const org_id = searchParams.get('org_id');

        const Url = `${baseUrl}api/get_usecases_for_org`;
        const urlWithParams = `${Url}?org_id=${org_id}`;


        const response = await fetch(urlWithParams, {
            method: "GET",
            headers: new Headers({
              authorization: `Bearer ${token}`, 
              "Content-Type": "application/json"
              
            }),
            
        });

        const textResponse = await response.text();

        // Now attempt to parse it as JSON
        const data = JSON.parse(textResponse);
        return Response.json({ data });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(req, res) {
    try {
      const bodyData = await req.json();
      const { org_id, name, desc, risks,bigRisk } = bodyData;
      const queryParams = new URLSearchParams({
        org_id: org_id,
        name: name,
        desc: desc,
        bigRisk: bigRisk
    });
    let Url = null;


    Url = `${baseUrl}api/create_usecase`;
    const urlWithParams = `${Url}?${queryParams}`;

      const response = await fetch(urlWithParams, {
        method: "POST",
        headers: new Headers({
          authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
          
        }),
        body: JSON.stringify(risks),
      });
  
      const data = await response.json();
      return Response.json({ data })

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  
export async function DELETE(req,res) {
  
  try{
    const { searchParams } = new URL(req.url);
    const usecase_id = searchParams.get('usecase_id');
 const cookieStore = cookies();
   const user = "0";
  // const user = cookieStore.get("user_id").value;
  const Url = `${baseUrl}api/delete_usecase`;
      const urlWithParams = `${Url}?usecase_id=${usecase_id}`;

 
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


 
export async function PUT(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    
    const usecase_id = searchParams.get('usecase_id');
    const bodyData = await req.json();
    const {  name, description, risks,bigRisk } = bodyData;
    console.log("UPDATING USECASE",bodyData);
    const queryParams = new URLSearchParams({
      usecase_id: usecase_id,
      name: name,
      desc: description,
      bigRisk: bigRisk
  });
  let Url = null;


  Url = `${baseUrl}api/update_usecase`;
  const urlWithParams = `${Url}?${queryParams}`;

    const response = await fetch(urlWithParams, {
      method: "PUT",
      headers: new Headers({
        authorization: `Bearer ${token}`, 
        "Content-Type": "application/json"
        
      }),
      
      body: JSON.stringify(risks),
    });

    const data = await response.json();
    return Response.json({ data })

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

