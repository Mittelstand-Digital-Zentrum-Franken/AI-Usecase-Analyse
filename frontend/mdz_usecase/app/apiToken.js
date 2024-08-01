
export async function getToken() {
  try {
  

      // Fetch a new token from the API
      const baseUrl = process.env.API_BASE_URL;
      const url = `${baseUrl}token`;
      const username = process.env.BACKEND_USERNAME;
      const password = process.env.BACKEND_PASSWORD;

      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.access_token;
      return token;
  } catch (error) {
      console.error("Error:", error);
      return null;
  }
}
