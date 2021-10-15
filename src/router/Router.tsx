import { memo, VFC } from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { SignUp } from "../components/pages/SignUp";
import { TimeLine } from "../components/pages/TimeLine";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <Route exact path="/" >
        <TimeLine />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  )
})
