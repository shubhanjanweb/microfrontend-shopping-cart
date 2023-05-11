import {
  getSessionObservable,
  getCartObservable,
  getOganiSession,
  sessionDestroy,
  sessionInit,
  OganiFavouriteStore,
  getFavouriteObservable,
  OganiSessionStore,
  OganiCartStore,
  appInit,
  checkForActivatedPath,
  singleSpaNavigate,
  oganiCurrency,
} from "@ogani/spa-shared-module";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

function navigate(event) {
  singleSpaNavigate(event);
}

function Navigation(props) {
  const [navChange, setNavChange] = useState<number>(new Date().getTime());

  useEffect(() => {
    window.addEventListener("single-spa:routing-event", (evt) => {
      console.log("single-spa finished mounting/unmounting applications!");
      setNavChange(new Date().getTime());
    });
  }, []);

  return (
    <ul>
      <li
        data-timeref={navChange}
        className={checkForActivatedPath("/dashboard/home") ? "active" : ""}
      >
        <a href="/dashboard/home" onClick={navigate}>
          Home
        </a>
      </li>
      <li
        data-timeref={navChange}
        className={checkForActivatedPath("/dashboard/product") ? "active" : ""}
      >
        <a href="/dashboard/product" onClick={navigate}>
          Products
        </a>
      </li>
      <li
        data-timeref={navChange}
        className={
          checkForActivatedPath("/dashboard/favourite") ? "active" : ""
        }
      >
        <a href="/dashboard/favourite" onClick={navigate}>
          Favourite
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">Pages</a>
        <ul className="header__menu__dropdown">
          <li data-timeref={navChange}>
            <a href="/dashboard/cart" onClick={navigate}>
              Shoping Cart
            </a>
          </li>
          <li data-timeref={navChange}>
            <a href="/payment" onClick={navigate}>
              Check Out
            </a>
          </li>
        </ul>
      </li>
      <li
        data-timeref={navChange}
        className={checkForActivatedPath("/contact") ? "active" : ""}
      >
        <a href="/contact" onClick={navigate}>
          Contact
        </a>
      </li>
    </ul>
  );
}

export default function Root(props) {
  const baseURL = "http://localhost:3000/auth";
  const [session, setSession] = useState<OganiSessionStore>(null);
  const [cart, setCart] = useState<OganiCartStore>(null);
  const [favourite, setFavourite] = useState<OganiFavouriteStore>(null);

  const checkForTokenValidation = async () => {
    const timer = setInterval(() => {
      const session = getOganiSession();
      if (session) {
        const config = {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        };
        axios
          .get(baseURL + "/validatetoken", config)
          .then((rsp) => {
            const href = window.location.href;
            if (href.indexOf("/user/") !== -1) {
              window.location.href = "/dashboard";
            }
          })
          .catch((err) => {
            console.log("Invalid Token. Token has expired.");
            sessionDestroy();
            clearInterval(timer);
            window.location.href = "/user/signin";
          });
      } else {
        const href = window.location.href;
        if (href.indexOf("/user/") === -1) {
          sessionDestroy();
          clearInterval(timer);
          window.location.href = "/user/signin";
        }
      }
    }, 1000 * 10);
  };

  useEffect(() => {
    let sub1, sub2, sub3;

    appInit().then((done) => {
      sub1 = getSessionObservable().subscribe((sessionRsp) => {
        if (sessionRsp) {
          setSession(sessionRsp);
          sessionInit();
          const session: OganiSessionStore = getOganiSession();
        }
      });
      sub2 = getCartObservable().subscribe((cart) => {
        setCart(cart);
      });
      sub3 = getFavouriteObservable().subscribe((fav) => {
        setFavourite(fav);
      });
      checkForTokenValidation();
    });

    return () => {
      sub1.unsubscribe();
      sub2.unsubscribe();
      sub3.unsubscribe();
    };
  }, []);

  function onLogoutClicked() {
    sessionDestroy();
  }

  if (!session) {
    return <Fragment></Fragment>;
  } else {
    return (
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <img
                        src={session.photoUrl}
                        className="header-profile-photo rounded-circle"
                        alt=""
                      />
                      <span>{session.fullName}</span>
                    </li>
                    <li>Free Shipping for all Order of {oganiCurrency(99)}</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="#">
                      <i className="fa fa-pinterest-p"></i>
                    </a>
                  </div>
                  <div className="header__top__right__auth">
                    <a href="#" onClick={onLogoutClicked}>
                      <i className="fa fa-user"></i> Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <a href="/dashboard/home">
                  <img src="//localhost:9003/img/logo.png" alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <Navigation />
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li>
                    <a href="/dashboard/favourite" onClick={navigate}>
                      <i className="fa fa-heart"></i>
                      {favourite && favourite.productList.length > 0 && (
                        <span>{favourite.productList.length}</span>
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard/cart" onClick={navigate}>
                      <i className="fa fa-shopping-bag"></i>
                      {cart && cart.shoppings && cart.shoppings.length > 0 && (
                        <span>{cart.shoppings.length}</span>
                      )}
                    </a>
                  </li>
                </ul>
                {cart && cart.shoppings && cart.shoppings.length > 0 && (
                  <div className="header__cart__price">
                    Cost:{" "}
                    <span>
                      {oganiCurrency(
                        cart.shoppings.reduce((total, item) => {
                          return (total = total + item.price * item.quantity);
                        }, 0)
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="humberger__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </header>
    );
  }
}
