import { Fragment, useEffect, useState } from "react";
import ProductCardContainer from "./product-card-container.component";

export default function ProductList({ products, onProductClicked }) {

  return (
    <Fragment>
      <div className="filter__item">
        <div className="row">
          <div className="col-lg-4 col-md-5">

          </div>
          <div className="col-lg-4 col-md-4">
            <div className="filter__found">
              <h6><span>{products.length}</span> Products found</h6>
            </div>
          </div>
          <div className="col-lg-4 col-md-5">

          </div>
        </div>
      </div>
      <div className="row">
        {products && products.length && <ProductCardContainer products={products} onProductClicked={onProductClicked} />}
      </div>
    </Fragment>
  );
}