import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const WithAuth = (props) => {
  const history = useHistory();

  useEffect(() => {
    const cookie_token = localStorage.getItem("token");
    if (cookie_token) {
      const decodedToken = jwtDecode(cookie_token);
      const userType = decodedToken.role;
      console.log(userType,"typeeee");
      if (userType === "user") {
         history.push('/shop');
      }else{
        history.push("/admin")
      }
    } else {
      history.push("/shop");
    }
  }, []);
  return <>{props.children}</>;
};

export default WithAuth;
