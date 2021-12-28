export default function formatLinks(links, myLinks) {
  let initialValues = {};
  Object.keys(links).forEach((key) => {
    initialValues[key] = "";

    myLinks &&
      Object.keys(myLinks).forEach((key2) => {
        if (key == key2) {
          initialValues[key] = myLinks[key2];
        }
      });
  });
  return initialValues;
}
