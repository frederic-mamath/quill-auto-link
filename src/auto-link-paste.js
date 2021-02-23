import Delta from "quill-delta";

import { normalize } from "./utils/url";

export const MagicPaste = (quill) => {
  quill.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
    if (typeof node.data !== "string") {
      return delta;
    }

    const updatedDelta = delta;

    const matches = node.data.match(/(https?:\/\/|www\.)[\S]+/g);

    if (!!matches && matches.length > 0) {
      const newDelta = new Delta();
      let str = node.data;
      matches.forEach((match) => {
        const split = str.split(match);
        const beforeLink = split.shift();
        newDelta.insert(beforeLink);
        newDelta.insert(match, { link: normalize(match) });
        str = split.join(match);
      });
      newDelta.insert(str);

      updatedDelta.ops = newDelta.ops;
    }

    return updatedDelta;
  });
};

export default MagicPaste;
