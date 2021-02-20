export default function (language = "", action) {
  if (action.type === "addLanguage") {
    return action.language;
  } else {
    return language;
  }
}
