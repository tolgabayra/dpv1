import { verifyToken } from "@/hooks/authHook";

export default function Home() {
  return (
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