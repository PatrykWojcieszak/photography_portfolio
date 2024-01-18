export const getPageTitleFromCollectionName = (collectionName: string) =>
  (collectionName.charAt(0).toUpperCase() + collectionName.slice(1))
    .replace(/([A-Z])/g, " $1")
    .trim();
