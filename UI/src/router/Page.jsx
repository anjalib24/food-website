import Layout from "@components/admin/Layout";
import { AdminContext } from "@contexts/AdminContext";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminPage from "./Admin/Page";
import ShopPage from "./Shop/Page";

const Page = () => {
  return (
    <Switch>
      <Route path="/admin">
        <AdminPage />
      </Route>

      {/* <Route path="/topics">
        <Topics />
      </Route> */}

      <Route path="/">
        <ShopPage />
      </Route>

    </Switch>
  );
};

function Admins() {
  let match = useRouteMatch();

  return (
    <AdminContext>
      <Switch>
        {/* <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route> */}
        <Route path={match.path}>
          <Layout Page={<Home />} />
        </Route>
      </Switch>
    </AdminContext>
  );
}

function Home() {
  return <div>Home</div>
}

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }


export default Page;
