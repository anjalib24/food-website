import { AdminContext } from "@contexts/AdminContext";
import Layout from "@components/admin/Layout"
import { Route, Switch, useRouteMatch } from "react-router-dom";

const Page = () => {
  let match = useRouteMatch();
  return (
    <AdminContext>
      <Layout Page={<Switch>
        <Route path={match.path}>
          <Home />
        </Route>
      </Switch>} />
    </AdminContext>
  );
};

function Home() {
  return <div>Home</div>
}

export default Page;
