import { useContext } from "react";
import { Context } from "./shopContext.jsx";
const Productnav = () => {
  const { ui } = useContext(Context);
  console.log(ui);
  return (
    <div className="productnav">
      {ui == "Phones & tablets" ? (
        <div>
         this phones
        </div>
      ) : ui == "Fashion" ? (
        <div>
        fashion
        </div>
      ) : ui == "Computing" ? (
        <div>
         Computing
        </div>
      ) : ui == "Gaming" ? (
        <div>
          <h1>gaming</h1>
        </div>
      ) : ui == "Health & beauty" ? (
        <div>
          health and beauty
        </div>
      ) : ui=="TVs & Audio"?(
        <div>
            tvs
        </div>
      ):ui=="Supermarket"?(
        <div>
            Supermarket
        </div>
      ):ui=="Home & Office"?(
        <div>
            home and office
        </div>
      ):null}
    </div>
  );
};
export default Productnav;
