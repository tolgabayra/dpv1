import { verifyToken } from "@/hooks/authHook";
export default function Home({ loggedIn }) {
  return(
    <p>
      Home
    </p>
  )
}

export const getServerSideProps = async (context: any) => {
  const { req } = context;

  // Do authentication logic here, e.g. verify token in cookie
  const token = req.cookies.token;
  const isLoggedIn = await verifyToken(token);

  if (!isLoggedIn) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      loggedIn: true,
    },
  };
};













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
  










