import { useState, useEffect } from "react";
import useApi from "../hooks/use-api";
import BaseLayout from "../layouts/base";
import * as itemApi from "../apis/item";

export default function EditItemScreen() {
  const [price, setPrice] = useState();
  const singleItem = useApi(itemApi.getItem, { keyExtractor: "item" });

  useEffect(() => {
    singleItem.request(1).then((res) => {
      const item = res.data.item;
      console.log("item: ", item);
      console.log("item price: ", item.price);
      setPrice(item.price);
    });
  }, []);

  const handleSave = () => {
    alert("save triggered");
  };

  if (singleItem.isLoading) return <></>;

  return (
    <BaseLayout>
      <div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleSave}>
          Save
        </button>
      </div>
    </BaseLayout>
  );
}
