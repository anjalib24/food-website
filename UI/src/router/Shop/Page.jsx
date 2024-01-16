import { Route, Switch } from "react-router-dom";
import Login from "@/Login/Login";
import Registration from "@/registration/Registration";
import Cart from "./Cart";
import { Home } from "./Home";
import Strip from "./strip/Strip";
import Productdetailpage from "./Productdetailpage";
import { ProductContexts } from "./context/ProductContext";
import Yourprofile from "./Yourprofile";
import PaymentSuccess from "./PaymentSuccess";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ContactUs from "./ContactUs";
import PaymentCancel from "./PaymentCancel";
import UserOrderDetails from "./UserOrderDetails";
import WithAuth from "@/components/WithAuth";

const Page = () => {
  return (
    <WithAuth>
    <Switch>
      <ProductContexts>
        <Route exact path="/contactus">
          <ContactUs />
        </Route>
        <Route exact path="/PaymentCancel">
          <PaymentCancel />
        </Route>
        <Route exact path="/userorderdetail">
          <UserOrderDetails />
        </Route>
        <Route exact path="/paymentsucess">
          <PaymentSuccess />
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

        <Route exact path="/shop">
          {/* <ShopPage /> */}
          <Home />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/yourprofile">
          <Yourprofile />
        </Route>
        <Route exact path="/productdetail/:id">
          <Productdetailpage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </ProductContexts>
    </Switch>
    </WithAuth>

  );
};

export default Page;
