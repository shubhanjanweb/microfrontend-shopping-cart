import { addProductToShoppingCart } from "@ogani/spa-shared-module";
import { Fragment } from "react";
import UtilService from "../services/util.service";

const baseImageUrl = '//localhost:9003/img/products/';

function onClickProduct(type: string, val: any, props: any) {
  return () => {
    props.onProductClicked({
      type,
      val
    })
  }
}
function toINR(val: number): string {
  return UtilService.toINR(val);
}

export function ProductDiscountCard(props) {

  const { productId, productName, price, discountPercentage, imageUrl, categoryId, categoryName, isFavourite } = props.product;
  return (
    <div className="col-lg-4">
      <div className="product__discount__item">
        <div className="product__discount__item__pic set-bg" style={{ backgroundImage: 'url("' + baseImageUrl + imageUrl + '")' }}>
          <div className="product__discount__percent">-{discountPercentage}%</div>
          {/* <ul className={`product__item__pic__hover ${isFavourite ? 'active' : 'normal'}`}>
            <li className="fav"><button className="btn btn-clear"
              onClick={onClickProduct('fav', { productId, isFavourite }, props)}><i className="fa fa-heart"></i></button></li>
            <li className="cart"><button className="btn btn-clear"
              onClick={onClickProduct('cart', { productId, quantity: 1, price: (price * (100 - discountPercentage) / 100) }, props)}><i className="fa fa-shopping-cart"></i></button></li>
          </ul> */}
        </div>
        <div className="product__discount__item__text">
          <span><a href={"/dashboard/category/" + categoryId}>{categoryName}</a></span>
          <h5><a href={"/dashboard/product/" + productId}>{productName}</a></h5>
          <div className="product__item__price">{toINR(price * (100 - discountPercentage) / 100)} <span>{toINR(price)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard(props) {
  const { productId, productName, price, imageUrl, categoryId, categoryName, isFavourite } = props.product;
  return (
    <div className="col-lg-4 col-md-6 col-sm-6">
      <div className="product__item">
        <div className="product__item__pic set-bg" style={{ backgroundImage: 'url("' + baseImageUrl + imageUrl + '")' }}>
          <ul className={`product__item__pic__hover ${isFavourite ? 'active' : 'normal'}`}>
            <li className="fav"><button className="btn btn-clear"
              onClick={onClickProduct('fav', { productId, isFavourite }, props)}><i className="fa fa-heart"></i></button></li>
            <li className="cart"><button className="btn btn-clear"
              onClick={onClickProduct('cart', { productId, quantity: 1, price }, props)}><i className="fa fa-shopping-cart"></i></button></li>
          </ul>
        </div>
        <div className="product__item__text">
          <span><a href={"/dashboard/category/" + categoryId}>{categoryName}</a></span>
          <h6><a href={"/dashboard/product/" + productId}>{productName}</a></h6>
          <h5>{toINR(price)}</h5>
        </div>
      </div>
    </div>
  );
}