import Layout from "@components/admin/Layout";
import { AdminContext } from "@contexts/AdminContext";
// import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import ProductsPage from "./Products/Page";
import WithAuth from "@/components/WithAuth";

const Page = () => {
  let match = useRouteMatch();
  return (
    <WithAuth>
    <AdminContext>
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
  );
};

function Home() {
  const param = useParams();
  console.log(param)
  return <div>Home</div>
}

export default Page;
