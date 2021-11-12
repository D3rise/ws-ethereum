import { useEffect, useState } from "react";
import { Shop } from "../../components/shop/shop.component";
import { UseContext } from "../../hooks/storage";

export const Shops = () => {
  const { contract } = UseContext();
  const [shops, setShops] = useState([]);

  const getShops = async () => {
    const shopList = await contract.methods.getShops().call();
    setShops(shopList);
  };

  useEffect(() => {
    getShops();
  });

  const getShopsList = () =>
    shops.map((city: string) => (
      <li>
        <Shop shopCity={city} />
      </li>
    ));

  return (
    <div className="shops-page">
      <div className="shops_page--shops">{getShopsList()}</div>
    </div>
  );
};
