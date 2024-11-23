import { Int32 } from "react-native/Libraries/Types/CodegenTypes";

let emmojis = ["😡", "😩", "🫤", "😐", "😃", "🤩", "💫"];

export default async function getEmmojiRating(hours: Int32, goal: Int32) {
  let percentage = (hours / goal) * 100;
  if (percentage < 5) {
    return emmojis[0];
  } else if (percentage < 20) {
    return emmojis[1];
  } else if (percentage < 40) {
    return emmojis[2];
  } else if (percentage < 80) {
    return emmojis[3];
  } else if (percentage < 100) {
    return emmojis[4];
  } else if (percentage < 125) {
    return emmojis[5];
  } else if (percentage < 200) {
    return emmojis[6];
  }
}
