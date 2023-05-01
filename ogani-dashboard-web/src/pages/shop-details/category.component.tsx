import { Fragment, useEffect, useState } from "react";
import CategoryService from "../../services/category.service";
import FavouriteService from "../../services/favourite.service";
import CategoryList from "../../shared-component/category-list.component";
import ProductList from "../../shared-component/product-list.component";

const imageUrl = '//localhost:9003/img/breadcrumb.jpg';
const baseImageUrl = '//localhost:9003/img/products/';

export default function Category(props) {
  let prdList = [], favList = [];

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const currentUrl = window.location.href;
    const categoryId = currentUrl.substr(currentUrl.indexOf('/category/') + 10);

    const sub = FavouriteService.getFavouriteList().subscribe(rsp => {
      favList = rsp.productList;
      updateProductListToFavList(prdList, favList);
    });

    if (categoryId !== '') {
      CategoryService.getProductsByCategoryId(parseInt(categoryId)).then(rsp => {
        setCategory(rsp.data);
        prdList = rsp.data.products.map((prd) => {
          return {
            productId: prd.id,
            productName: prd.productName,
            price: prd.price,
            discountPercentage: prd.discountPercentage,
            description: prd.description,
            imageUrl: prd.imageUrl,
            categoryId: rsp.data.id,
            categoryName: rsp.data.categoryName,
            isFavourite: false
          };
        });
        console.log('prdObj', prdList);
        updateProductListToFavList(prdList, favList);
      });
    } else {
      // TODO
    }

    function updateProductListToFavList(plist: any[], flist: any[]) {
      const newList = [...plist.map(prd => {
        prd.isFavourite = flist.includes(prd.productId.toString());
        return { ...prd };
      })];
      setProducts(newList);
    }

    return () => {
      sub.unsubscribe();
    };
  }, []);

  if (!products || !category) {
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
                  <h2>{category.categoryName}</h2>
                  <div className="breadcrumb__option">
                    <a href="/dashboard/home">Home</a>
                    <span>Category</span>
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
                  <div>No Product Found</div>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}