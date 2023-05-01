import { useEffect, useState } from "react";
import CartService from "../../services/cart.service";
import { deleteProductFromShoppingCart } from "@ogani/spa-shared-module";
import UtilService from "../../services/util.service";


const imageUrl = '//localhost:9003/img/breadcrumb.jpg';

export function ShoppingLine(props) {
  const baseImgUrl = 'http://localhost:9003/img/products/';
  const line = props.line;
  function onLineDelete() {
    props.onLineDelete(line);
  }

  return (
    <tr>
      <td className="shoping__cart__thumbnail">
        <img src={baseImgUrl + line.imageUrl} alt="" />
      </td>
      <td className="shoping__cart__item">
        <h4>{line.productName}</h4>
        <h6>{line.categoryName}</h6>
      </td>
      <td className="shoping__cart__price">
        {toINR(line.price)}
      </td>
      <td className="shoping__cart__quantity">
        <div className="quantity">
          <div className="pro-qty">
            <input type="text" value={line.quantity} />
          </div>
        </div>
      </td>
      <td className="shoping__cart__total">
        {toINR(parseFloat(line.price) * parseFloat(line.quantity))}
      </td>
      <td className="shoping__cart__item__close">
        <span className="icon_close" onClick={onLineDelete}></span>
      </td>
    </tr>
  );
}

function toINR(val: number): string {
  return UtilService.toINR(val);
}

export function ShoppingCart(props) {
  const [shoppingLines, setShoppingLines] = useState([]);

  useEffect(() => {
    const sub = CartService.getShoppingList().subscribe(rsp => {
      setShoppingLines(rsp.shoppings);
    });
    return () => {
      sub.unsubscribe();
    }
  }, []);

  function onLineDelete(line) {
    deleteProductFromShoppingCart({
      productId: line.id,
      quantity: line.quantity,
      price: line.price // not required
    });
  }

  return (
    <div>
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: 'url("' + imageUrl + '")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Shopping Cart</h2>
                <div className="breadcrumb__option">
                  <a href="/dashboard">Home</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product" colSpan={2}>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingLines && shoppingLines.length > 0 &&
                      shoppingLines.map(line =>
                        <ShoppingLine key={line.id} line={line} onLineDelete={onLineDelete} />
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <a href="/dashboard/product" className="primary-btn cart-btn">CONTINUE SHOPPING</a>
              </div>
            </div>
            <div className="offset-lg-6 col-lg-6">
              <div className="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>Subtotal <span>{toINR(shoppingLines.reduce((total, item) => {
                    return total = total + (item.price * item.quantity);
                  }, 0))}</span></li>
                  <li>Total <span>{toINR(shoppingLines.reduce((total, item) => {
                    return total = total + (item.price * item.quantity);
                  }, 0))}</span></li>
                </ul>
                <a href="/payment" className="primary-btn" >PROCEED TO CHECKOUT</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}