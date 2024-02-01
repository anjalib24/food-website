import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const WithAuth = (props) => {
  const history = useHistory();
console.log('history', history)

  const unprotectedRoutes = [
    'paymentsucess',
    'PaymentCancel',
    'productdetail'
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
const check = history.location.pathname.split("/")[1]
console.log(check,"checkkk");
  // Check if the current route is in the unprotectedRoutes array
  if (unprotectedRoutes.includes(check)) {
    // No redirection for unprotected routes
    history.push(history.location.pathname)
    return 
  }

  // Redirect to the main shop page for other cases
  history.push("/shop");
}, []);

  return <>{props.children}</>;
};

export default WithAuth;
