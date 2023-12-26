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
<<<<<<< HEAD
import WithAuth from "@/components/WithAuth";
=======
import CustomizationPage from "./Customizations/Page";
import "./styles.css";
import BestSellerProduct from "./BestSellerProduct/Page";
import Reviews from "./Reviews/Page";
import FAQs from "./Faqs/Page";
import Blogs from "./Blogs/Page";
>>>>>>> 1d35e824ed2ac228f2fdf71ce15b45c492fda732

const Page = () => {
  let match = useRouteMatch();
  return (
    <WithAuth>
    <AdminContext>
<<<<<<< HEAD
      <Layout Page={
        <Switch>
          <Route path={`${match.path}/products`}>
            <ProductsPage />
          </Route>

          <Route path={`${match.path}/:id`}>
            <Home />
          </Route>
        </Switch>
      } />
    </AdminContext></WithAuth>
=======
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

            <Route path={`${match.path}/:id`}>{/* <Editor /> */}</Route>
          </Switch>
        }
      />
    </AdminContext>
>>>>>>> 1d35e824ed2ac228f2fdf71ce15b45c492fda732
  );
};

export default Page;
