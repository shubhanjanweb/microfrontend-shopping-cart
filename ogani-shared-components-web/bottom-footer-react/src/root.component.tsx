import { OganiSessionStore, getSessionObservable, getAppInitStatus } from "@ogani/spa-shared-module";
import { Fragment, useEffect, useState } from "react";
import { take } from "rxjs/operators";

export default function Root(props) {

  const [store, setStore] = useState<boolean>(false);

  useEffect(() => {
    let sub;
    getAppInitStatus().subscribe(done => {
      setStore(done);
    });
    return () => {
      sub.unsubscribe();
    }
  }, []);

  if (!store) {
    return <Fragment></Fragment>;
  } else {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer__copyright">
                <div className="footer__copyright__text">
                  <p>
                    <a href="./"><img className="footer__logo" src="//localhost:9003/img/logo.png" alt="" /></a>
                    Copyright &copy; {new Date().getFullYear()} | All rights reserved
                  </p>
                </div>
                <div className="footer__copyright__payment"><img src="//localhost:9003/img/payment-item.png" alt="" /></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
