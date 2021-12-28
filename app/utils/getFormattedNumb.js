export default function getFormattedNumb(numb) {
  let newNumb = numb.replace(/[^a-zA-Z0-9]/g, "");
  while (newNumb.charAt(0) === "1") {
    newNumb = newNumb.substring(1);
  }

  return newNumb;
}
