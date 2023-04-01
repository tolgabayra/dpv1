import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function withAuth(WrappedComponent: any) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      fetch("http://localhost:5000/api/v1/auth/verify_token", {
        method: "POST",
        credentials: "include"
      })
        .then((res) => {
          if (res.ok) {
            setLoggedIn(true);
          } else {
            router.push("/auth/login");
          }
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!loggedIn) {
      return null;
    }

    return <WrappedComponent loggedIn={loggedIn} {...props} />;
  };

  return Wrapper;
}

export default withAuth;