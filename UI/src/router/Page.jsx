// Page.jsx

import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminPage from "./Admin/Page";
import ShopPage from "./Shop/Page";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Login from "@/Login/Login";
import Registration from "@/registration/Registration";
import Cart from "./Shop/Cart";
import { Home } from "./Shop/Home";
import Strip from "./Shop/strip/Strip";
import Productdetailpage from "./Shop/Productdetailpage";
import { ProductContexts } from "./Shop/context/ProductContext";
import Yourprofile from "./Shop/Yourprofile";
import PaymentSuccess from "./Shop/PaymentSuccess";

const Page = () => {
  return (
    <Switch>
      <ProductContexts>
        <Route exact path="/paymentsucess">
          <PaymentSuccess/>
        </Route>
        <Route exact path="/strip">
          <Strip />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Registration />
        </Route>
        <Route exact path="/admin">
          <AdminPage />
        </Route>
        <Route exact path="/shop">
          <ShopPage />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/yourprofile">
          <Yourprofile/>
        </Route>
        <Route exact path="/productdetail/:id">
          <Productdetailpage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </ProductContexts>
    </Switch>
  );
};
export default Page;