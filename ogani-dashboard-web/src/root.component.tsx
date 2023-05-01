import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard.component";
import { getAppInitStatus } from "@ogani/spa-shared-module";
import { Fragment, useEffect, useState } from "react";
import { take } from "rxjs/operators";

export default function Root(props) {

  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    getAppInitStatus().subscribe(done => {
      setLoad(done);
    });
  }, []);

  if (!load) {
    return <Fragment></Fragment>;
  } else {
    return (
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  }
}
