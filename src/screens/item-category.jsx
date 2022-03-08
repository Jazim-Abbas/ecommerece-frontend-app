import BaseLayout from "../layouts/base";
import * as shopApi from "../apis/shop";
import * as itemCategoryApi from "../apis/item-category";
import useApi from "../hooks/use-api";
import { useEffect, useState } from "react";
import { AppLoading } from "../components";
import { Link } from "react-router-dom";

export default function ItemCategoryScreen() {
  const shopDetailApi = useApi(shopApi.getShopDetail, {
    keyExtractor: "shop",
  });

  useEffect(() => {
    shopDetailApi.request();
  }, []);

  if (shopDetailApi.isLoading) return <AppLoading />;

  if (!shopDetailApi.data) {
    return (
      <BaseLayout>
        <div className="alert alert-danger">
          <p>You first need to create shop in order to create item category</p>
          <Link to="/init-shop">Create Shop</Link>
        </div>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <CategoryList shop={shopDetailApi.data} />
    </BaseLayout>
  );
}

function CategoryList({ shop }) {
  const [categories, setCategories] = useState([]);
  const categoryiesApi = useApi(itemCategoryApi.getAllCategories);

  useEffect(() => {
    categoryiesApi.request(shop.id).then((res) => {
      const categories = res.data.categories;
      setCategories(categories);
    });
  }, []);

  if (categoryiesApi.isLoading) return <AppLoading />;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((categ) => (
          <tr key={categ.id}>
            <td>{categ.id}</td>
            <td>{categ.name}</td>
            {/* <td>
              <i className="fa fa-times pointer" aria-hidden="true" />
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
