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
