export default function (token = "", action) {
  if (action.type === "tokenok") {
    var newToken = action.token;
    console.log(newToken);
    return newToken;
  } else {
    return token;
  }
}
