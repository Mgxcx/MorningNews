export default function (wishlist = [], action) {
  if (action.type === "addArticle") {
    let inWishList = wishlist.find(
      (element) => element.title === action.article.title
    );
    if (inWishList) {
      inWishList = true;
    } else {
      inWishList = false;
    }
    console.log(inWishList);
    if (!inWishList) {
      return [...wishlist, action.article];
    } else {
      return wishlist;
    }
  } else if (action.type === "deleteArticle") {
    return wishlist.filter((article) => article.title !== action.title);
  } else {
    return wishlist;
  }
}
