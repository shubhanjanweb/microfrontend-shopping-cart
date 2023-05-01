import { Fragment, useEffect, useState } from "react";
import FavouriteService from "../../services/favourite.service";
import ProductService from "../../services/product.service";
import CategoryList from "../../shared-component/category-list.component";
import ProductList from "../../shared-component/product-list.component";

const imageUrl = '//localhost:9003/img/breadcrumb.jpg';

export default function FavouriteList(props) {
  let prdList = [], favList = [];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const sub = FavouriteService.getFavouriteList().subscribe(rsp => {
      favList = rsp.productList;
      updateProductListToFavList(prdList, favList);
    });

    FavouriteService.getFavProductList().then(rsp => {
      prdList = rsp.data.map(prd => {
        return {
          productId: prd.id,
          productName: prd.productName,
          price: prd.price,
          discountPercentage: prd.discountPercentage,
          imageUrl: prd.imageUrl,
          categoryId: prd.category.id,
          categoryName: prd.category.categoryName,
          isFavourite: true
        };
      });
      setProducts(prdList);
    });
  }, []);

  function updateProductListToFavList(plist: any[], flist: any[]) {
    const newList = [...plist.map(prd => {
      prd.isFavourite = flist.includes(prd.productId.toString());
      return { ...prd };
    })].filter(item => item.isFavourite);
    setProducts(newList);
  }

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
                <h2>Favourite List</h2>
                <div className="breadcrumb__option">
                  <a href="/dashboard">Home</a>
                  <span>Favourite</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Department</h4>
                  <CategoryList />
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-7">
              {products && products.length > 0 &&
                <Fragment>
                  <ProductList onProductClicked={props.onProductClicked} products={products} />
                </Fragment>
              }
              {products && products.length === 0 &&
                <div>No item has been added in favourite list.</div>
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}