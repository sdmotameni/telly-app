import { useContext } from "react";
import InfoContext from "../misc/InfoContext";

export default function getMetaDetails(platform, handle) {
  const { links } = useContext(InfoContext);

  if (!links) return;

  return {
    title: links[platform]["title"],
    image: links[platform]["image"],
    url: links[platform]["url"] + handle,
  };
}
