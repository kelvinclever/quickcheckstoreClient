import Categorynav from "./Categorynav";
import Productnav from "./Productnav";
import "./shop.css";
const Shop = () => {
  return (
    <div className="shop">
      <div className="categoryside">
        <Categorynav />
      </div>
      <div className="productside">
        <Productnav />
      </div>
    </div>
  );
};
export default Shop;
