export const allItemsQuery = `
    query {
        allItems {
            message
            data
        }
    }
`;

export const singleItemQuery = `
    query($id: String) {
        singleItem(id: $id) {
            message
            data
        }
    }
`;

export const singleShopDetailQuery = `
    query($shopId: String) {
        getSingleShopDetail(shopId: $shopId) {
            message
            data
        }
    }
`;

export const updateProfileMutation = `
    mutation($user: UpdateUserPayload, $image: Upload) {
        updateProfile(user: $user, image: $image) {
            message
            data
        }
    }
`;

export const allItemCategoriesMutation = `
    mutation($shopId: String) {
        allCategories(shopId: $shopId) {
            message
            data
        }
    }
`;

export const createNewCategoryMutation = `
    mutation($name: String, $shopId: String) {
        createCategory(name: $name, shopId: $shopId) {
            message
            data
        }
    }
`;

export const shopDetailQuery = `
    mutation {
        getShopDetails {
            message
            data
        }
    }
`;

export const updateShopMutation = `
    mutation($shopId: String, $name: String, $image: Upload) {
        updateShop(shopId: $shopId, name: $name, image: $image) {
            message
            data
        }
    }
`;
