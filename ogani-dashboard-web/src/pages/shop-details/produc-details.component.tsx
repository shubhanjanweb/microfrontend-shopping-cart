import { Fragment, useEffect, useState } from "react";
import FavouriteService from "../../services/favourite.service";
import ProductService from "../../services/product.service";
import CategoryList from "../../shared-component/category-list.component";

const imageUrl = '//localhost:9003/img/breadcrumb.jpg';
const baseImageUrl = '//localhost:9003/img/products/';


export default function ProductDetails(props) {
  let prd = null, favList = [];

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const currentUrl = window.location.href;
    const productId = currentUrl.substr(currentUrl.indexOf('/product/') + 9);

    const sub = FavouriteService.getFavouriteList().subscribe(rsp => {
      favList = rsp.productList;
      updateProductToFavList(prd, favList);
    });

    if (productId !== '') {
      ProductService.getProductById(parseInt(productId)).then(rsp => {
        prd = rsp.data;
        prd = {
          productId: prd.id,
          productName: prd.productName,
          price: prd.price,
          discountPercentage: prd.discountPercentage,
          description: prd.description,
          imageUrl: prd.imageUrl,
          categoryId: prd.category.id,
          categoryName: prd.category.categoryName,
          isFavourite: false
        };
        console.log('prdObj', prd);
        updateProductToFavList(prd, favList);
      });
    } else {
      // TODO
    }


    function updateProductToFavList(p: any, flist: any[]) {
      if (p) {
        p.isFavourite = flist.includes(p.productId);
        setProduct({ ...p });
      }
    }
    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!product) {
    return (
      <Fragment>
        No Product found.
      </Fragment>
    );
  } else {
    return (
      <main>
        <section className="hero hero-normal">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="hero__categories">
                  <div className="hero__categories__all">
                    <i className="fa fa-bars"></i>
                    <span>All departments</span>
                  </div>
                  <CategoryList />
                </div>
              </div>
              <div className="col-lg-9">
                <div className="hero__search">
                  <div className="hero__search__form">
                    <form action="#">
                      <div className="hero__search__categories">
                        All Categories
                        <span className="arrow_carrot-down"></span>
                      </div>
                      <input type="text" placeholder="What do yo u need?" />
                      <button type="submit" className="site-btn">SEARCH</button>
                    </form>
                  </div>
                  <div className="hero__search__phone">
                    <div className="hero__search__phone__icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="hero__search__phone__text">
                      <h5>+65 11.188.888</h5>
                      <span>support 24/7 time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="breadcrumb-section set-bg" style={{ backgroundImage: 'url("' + imageUrl + '")' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h2>{product.productName}</h2>
                  <div className="breadcrumb__option">
                    <a href="/dashboard/home">Home</a>
                    <a href={"/dashboard/category/" + product.categoryId}>
                      {product.categoryName}
                    </a>
                    <span>{product.productName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="product-details spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="product__details__pic">
                  <div className="product__details__pic__item">
                    <img className="product__details__pic__item--large"
                      src={baseImageUrl + product.imageUrl} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="product__details__text">
                  <h3>{product.productName}</h3>
                  <div className="product__details__price">${product.price}</div>
                  <p>{product.description}</p>
                  <div className="product__details__quantity">
                    <div className="quantity">
                      <div className="pro-qty">
                        <input type="text" value="1" />
                      </div>
                    </div>
                  </div>
                  <a href="#" className="primary-btn">ADD TO CARD</a>
                  <a href="#" className="heart-icon"><span className="icon_heart_alt active"></span></a>
                  <ul>
                    <li><b>Availability</b> <span>In Stock</span></li>
                    <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                    <li><b>Weight</b> <span>0.5 kg</span></li>
                    <li><b>Share on</b>
                      <div className="share">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-instagram"></i></a>
                        <a href="#"><i className="fa fa-pinterest"></i></a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}