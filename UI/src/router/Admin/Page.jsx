import Layout from "@components/admin/Layout";
import { AdminContext } from "@contexts/AdminContext";
// import { Route, Switch, useRouteMatch } from "react-router-dom";
import {
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import ProductsPage from "./Products/Page";
import WithAuth from "@/components/WithAuth";
import CustomizationPage from "./Customizations/Page";
import "./styles.css";
import BestSellerProduct from "./BestSellerProduct/Page";
import Reviews from "./Reviews/Page";
import FAQs from "./Faqs/Page";
import Blogs from "./Blogs/Page";
import Charges from "./Charges/Page";
import Users from "./Users/Page"
import Orders from "./orders/page"

const Page = () => {
  let match = useRouteMatch();
  return (
    <WithAuth>
      <AdminContext>
        <Layout
          Page={
            <Switch>
              <Route path={`${match.path}/products`}>
                <ProductsPage />
              </Route>

              <Route path={`${match.path}/customizations`}>
                <CustomizationPage />
              </Route>

              <Route path={`${match.path}/best-seller`}>
                <BestSellerProduct />
              </Route>

              {/* create a route for review */}
              <Route path={match.path + "/reviews"}>
                <Reviews />
              </Route>

              <Route path={`${match.path}/faqs`}>
                <FAQs />
              </Route>

              <Route path={match.path + "/blogs"}>
                <Blogs />
              </Route>

              <Route path={`${match.path}/charges`}>
                <Charges />
              </Route>

              <Route path={`${match.path}/users`}>
                <Users/>
              </Route>
             <Route path={`${match.path}/orders`}>
                <Orders/>
              </Route>
            </Switch>
          }
        />
      </AdminContext>
    </WithAuth>

  );
};



export default Page;
