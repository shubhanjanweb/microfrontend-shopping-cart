import { Fragment } from "react";
import { ProductCard } from "./product-card.component";

export default function ProductCardContainer(props) {
  const listItems = props.products.map(prd =>
    <ProductCard className="item" key={prd.productId} product={prd} onProductClicked={props.onProductClicked} />
  );
  return (
    <Fragment>
      {listItems}
    </Fragment>
  );
}
