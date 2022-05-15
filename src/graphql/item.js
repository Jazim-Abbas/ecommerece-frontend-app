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
