import BaseLayout from "../layouts/base";
import * as shopApi from "../apis/shop";
import useApi from "../hooks/use-api";
import { useEffect } from "react";
import { AppLoading } from "../components";
import { Link } from "react-router-dom";

export default function ItemCategoryScreen() {
  const shopExistsApi = useApi(shopApi.isShopExists, {
    keyExtractor: "isShopExists",
  });

  useEffect(() => {
    shopExistsApi.request();
  }, []);

  if (shopExistsApi.isLoading) return <AppLoading />;

  if (shopExistsApi.data === false) {
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
      <CategoryList />
    </BaseLayout>
  );
}

function CategoryList() {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>First Category</td>
          <td>
            <i className="fa fa-times pointer" aria-hidden="true" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
