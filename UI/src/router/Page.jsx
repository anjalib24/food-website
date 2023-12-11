import { Route, Switch } from "react-router-dom";
import Admin from "./Admin/Page";
import Shop from "./Shop/Page";

const Page = () => {
  return (
    <Switch>
      <Route path="/admin">
        <Admin />
      </Route>
      <Route path="/">
        <Shop />
      </Route>
    </Switch>
  );
};

export default Page;
