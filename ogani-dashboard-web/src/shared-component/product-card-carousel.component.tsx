import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { ProductDiscountCard } from "./product-card.component";

export default function ProductCardCarousel(props) {
  const listItems = props.products.map(prd =>
    <ProductDiscountCard className="item" key={prd.productId} product={prd} onProductClicked={props.onProductClicked} />
  );
  return (
    <OwlCarousel className="product__discount__slider owl-theme"
      autoplay={true}
      loop={true}
      autoplayTimeout={3000}
      autoplayHoverPause={true}
      smartSpeed={700}
      margin={10}
      nav={false}>
      {listItems}
    </OwlCarousel>
  );
}
