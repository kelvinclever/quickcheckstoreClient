import { useContext } from "react";
import { UIContext } from "./shopContext.jsx";
import Products from "./Products.jsx";
import TVsAudio from "../shopCollection/TVsAudio.jsx"
import Supermarket from "../shopCollection/Supermarket.jsx"
import Computing from "../shopCollection/Computing.jsx"
import Gaming from "../shopCollection/Gaming.jsx"
import Sports from "../shopCollection/Sports.jsx"
import HealthBeauty from "../shopCollection/HealthBeauty.jsx"
import PhonesTablet from "../shopCollection/PhonesTablet.jsx"
import { apiurl } from "./alliases.jsx";
const Productnav = () => {
  const { categories } = useContext(UIContext);
  console.log(categories);
  return (
    <div className="productnav">
      {categories == "Phones & tablets" ? (
        <div>
       <PhonesTablet/>
        </div>
      ) : categories== "Sports" ? (
        <div>
        <Sports/>
        </div>
      ) :categories == "Computing" ? (
        <div>
       <Computing/>
        </div>
      ) : categories== "Gaming" ? (
        <div>
        <Gaming/>
        </div>
      ) : categories == "Health & beauty" ? (
        <div>
        <HealthBeauty/>
        </div>
      ) : categories=="TVs & Audio"?(
        <div>
           <TVsAudio/>
        </div>
      ):categories=="Supermarket"?(
        <div>
             <Supermarket/>
        </div>
      ):categories=="AllProducts"?(
        <div>
        <Products apiurl={`${apiurl}/`}/>
        </div>
      ):null}
    </div>
  );
};
export default Productnav;
