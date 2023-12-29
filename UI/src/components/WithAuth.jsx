import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const WithAuth = (props) => {
  const history = useHistory();

  useEffect(() => {
    const cookie_token = localStorage.getItem("token");
    // const cookie_token = Cookies.get('cookie_token');
    if (cookie_token) {
      const decodedToken = jwtDecode(cookie_token);
      const userType = decodedToken.role;
      if (userType === "user") {
        // history.push('/login');
      }
    } else {
      history.push("/shop");
    }
  }, []);
  return <>{props.children}</>;
};

export default WithAuth;
