import { useContext } from "react";
import { UIContext } from "./shopContext.jsx";
import Products from "./Products.jsx";
import { apiurl } from "./alliases.jsx";
const Productnav = () => {
  const { categories } = useContext(UIContext);
  console.log(categories);
  return (
    <div className="productnav">
      {categories == "Phones & tablets" ? (
        <div>
        <Products apiurl={`${apiurl}/phonesTablets/category`}/>
        </div>
      ) : categories== "Sports" ? (
        <div>
        <Products apiurl={`${apiurl}/sports/category`}/>
        </div>
      ) :categories == "Computing" ? (
        <div>
          <Products apiurl={`${apiurl}/computing/category`}/>
        </div>
      ) : categories== "Gaming" ? (
        <div>
            <Products apiurl={`${apiurl}/computing/category`}/>
        </div>
      ) : categories == "Health & beauty" ? (
        <div>
        <Products apiurl={`${apiurl}/`}/>
        </div>
      ) : categories=="TVs & Audio"?(
        <div>
           <Products apiurl={`${apiurl}/tvsaudio/category`}/>
        </div>
      ):categories=="Supermarket"?(
        <div>
             <Products apiurl={`${apiurl}/supermarket/category`}/>
        </div>
      ):categories=="Home & Office"?(
        <div> 
          <Products apiurl={`${apiurl}/`}/>

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
