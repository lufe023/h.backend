const { createListController } = require("../list/list.controllers");

const createFavoriteList = async (userId) => {
    try {
        await createListController(userId, "Favorites", "Favorites");
    } catch (error) {
        console.error("Error creating favorites list:", error);
    }
};

module.exports = { createFavoriteList };
