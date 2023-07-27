import { useContext } from "react";
import { Context } from "./shopContext.jsx";
import Products from "./Products.jsx";
const Productnav = () => {
  const { ui } = useContext(Context);
  console.log(ui);
  return (
    <div className="productnav">
      {ui == "Phones & tablets" ? (
        <div>
        <Products apiurl={`http://localhost:8082/products/phonesTablets/category`}/>
        </div>
      ) : ui == "Sports" ? (
        <div>
        <Products apiurl={`http://localhost:8082/products/sports/category`}/>
        </div>
      ) : ui == "Computing" ? (
        <div>
          <Products apiurl={`http://localhost:8082/products/computing/category`}/>
        </div>
      ) : ui == "Gaming" ? (
        <div>
           sorry check back later
        </div>
      ) : ui == "Health & beauty" ? (
        <div>
         sorry check back later
        </div>
      ) : ui=="TVs & Audio"?(
        <div>
           <Products apiurl={`http://localhost:8082/products/tvsaudio/category`}/>
        </div>
      ):ui=="Supermarket"?(
        <div>
             <Products apiurl={`http://localhost:8082/products/supermarket/category`}/>
        </div>
      ):ui=="Home & Office"?(
        <div>
           sorry check later
        </div>
      ):ui=="AllProducts"?(
        <div>
        <Products apiurl={`http://localhost:8082/products`}/>
        </div>
      ):null}
    </div>
  );
};
export default Productnav;
