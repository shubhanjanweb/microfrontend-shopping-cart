import { Route, Routes } from "react-router-dom";
import ProductService from "../services/product.service";
import Home from "./home/home.component";
import Category from "./shop-details/category.component";
import FavouriteList from "./shop-details/favourite-list.component";
import ProductDetails from "./shop-details/produc-details.component";
import ShoppingPage from "./shop-details/shopping-page.component";
import { ShoppingCart } from "./shopping-cart/shopping-cart.component";

export default function Dashboard(props) {

  function onProductClicked(obj) {
    return ProductService.addProductToList(obj);
  }

  return (
    <Routes>
      <Route path="/dashboard/home" element={<Home />} />
      <Route path="/dashboard/product" element={<ShoppingPage onProductClicked={onProductClicked} />} />
      <Route path="/dashboard/product/:id" element={<ProductDetails onProductClicked={onProductClicked} />} />
      <Route path="/dashboard/category/:id" element={<Category onProductClicked={onProductClicked} />} />
      <Route path="/dashboard/favourite" element={<FavouriteList onProductClicked={onProductClicked} />} />
      <Route path="/dashboard/cart" element={<ShoppingCart />} />
    </Routes>
  );
}