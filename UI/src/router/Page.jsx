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

const Page = () => {
  return (
    <Switch>
       <Route path="/strip">
        <Strip/>
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Registration/>
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
      <Route path="/shop">
        <ShopPage />
      </Route>
      <Route path="/cart">
        <Cart/>
      </Route>
      <Route path="/">
        <Home/>
      </Route>
   
    </Switch>
  );
};

export default Page;
