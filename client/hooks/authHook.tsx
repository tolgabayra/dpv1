export async function verifyToken(token: any) {
    try {
      const response = await fetch("http://localhost:5000/verify_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data.valid; // true or false
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  