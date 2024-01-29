import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const WithAuth = (props) => {
  const history = useHistory();
console.log('history', history)

  const unprotectedRoutes = [
    '/paymentsucess',
    'PaymentCancel',
    '/productdetail${id}'
  ]
console.log(history,"hiodtoryy");
useEffect(() => {
  
  const cookie_token = localStorage.getItem("token");
 
  if (cookie_token) {
    const decodedToken = jwtDecode(cookie_token);
    const userType = decodedToken.role;

    if (userType === "user") {
      // No need to redirect for authenticated users
      return;
    } else {
      // Redirect admin users to the admin page
      history.push("/admin");
      return;
    }
  }

  // Check if the current route is in the unprotectedRoutes array
  if (unprotectedRoutes.includes(history.location.pathname)) {
    // No redirection for unprotected routes
    return;
  }

  // Redirect to the main shop page for other cases
  history.push("/shop");
}, []);

  return <>{props.children}</>;
};

export default WithAuth;
