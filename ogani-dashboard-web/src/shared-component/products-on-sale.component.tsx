import { template } from "@babel/core";
import { Fragment, useEffect, useState } from "react";
import FavouriteService from "../services/favourite.service";
import ProductService from "../services/product.service";
import ProductCardCarousel from "./product-card-carousel.component";

export default function ProductsOnSale(props) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(props.products.filter(item => item.discountPercentage > 0));
  }, []);

  return (
    <div className="product__discount">
      <div className="section-title product__discount__title">
        <h2>Sale Off</h2>
      </div>
      <div className="row">
        {products && products.length && <ProductCardCarousel products={products} onProductClicked={props.onProductClicked} />}
      </div>
    </div>
  );
}