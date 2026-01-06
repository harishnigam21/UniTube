import { createSelector } from "@reduxjs/toolkit";
const selectItems = (state) => state.videos.items;
const selectCategory = (state) => state.videos.filterItems.category;
const selectSearch = (state) => state.videos.filterItems.search;

export const interestItems = createSelector(
  [selectItems, selectCategory, selectSearch],
  (items, categories, searches) => {
    if (categories.length == 0 && searches.length == 0) {
      return [];
    }
    return items.filter((item) => {
      const categoryMatch =
        categories.length > 0 && categories.includes(item.category);
      const searchMatch =
        searches.length > 0 &&
        searches.some((term) => {
          const trm = term.toLowerCase();
          return (
            item.title.toLowerCase().includes(trm) ||
            item.channelName.toLowerCase().includes(trm) ||
            item.description.toLowerCase().includes(trm) ||
            item.category.toLowerCase().includes(trm)
          );
        });
      const combine = [...categoryMatch, ...searchMatch];
      //remove duplicates
      const uniqueMap = new Map();
      combine.forEach((item) => {
        uniqueMap.set(item.id, item);
      });
      return Array.from(uniqueMap.values());
    });
  }
);

export const recommendedItems = createSelector([interestItems], (items) => {
  return [...items].sort((a, b) => {
    //ranking videos
    const scoreA = a.views * 0.5 + a.likes * 0.3 + a.subscribers * 0.2;
    const scoreB = b.views * 0.5 + b.likes * 0.3 + b.subscribers * 0.2;
    return scoreB - scoreA;
  });
});

//role of tags here
export const inthereRecommendations = (tags, id) =>
  createSelector([selectItems], (items) => {
    if (tags.length == 0) {
      return items;
    }
    return items.filter((item) => {
      if (item.id != id) {
        return item.tags?.some((tag) => tags.includes(tag));
      }
    });
  });

//temporary, in future this will be fetched from DB
export const getVideoInfo = (id) =>
  createSelector([selectItems], (items) => items.find((item) => item.id == id));
