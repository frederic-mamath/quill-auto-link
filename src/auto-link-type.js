import Delta from "quill-delta";

import { normalize } from "./utils/url";

export const MagicType = (quill) => {
  quill.on("text-change", (delta) => {
    const { ops } = delta;

    if (!ops || ops.length < 1 || ops.length > 2) {
      return;
    }
    const lastOp = ops[ops.length - 1];

    // If the character is not a space, we stop here
    if (
      !lastOp.insert ||
      typeof lastOp.insert !== "string" ||
      !lastOp.insert.match(/\s/)
    ) {
      return;
    }

    // Get the input's text
    const selection = quill.getSelection();

    if (!selection) {
      return;
    }
    const [leaf] = quill.getLeaf(selection.index);

    if (!leaf.text || leaf.parent.domNode.localName === "a") {
      return;
    }

    const urlMatch = leaf.text.match(/(https?:\/\/[\S]+)|(www.[\S]+)/);
    if (!urlMatch) {
      return;
    }

    const leafIndex = quill.getIndex(leaf);
    const index = leafIndex + urlMatch.index; // Index at which the URL starts

    // Add operations to do to build the new input's content with the links
    const opsWithLink = new Delta()
      .retain(index) // Keep the number of characters before the links start
      .delete(leaf.text.length) // Delete the number of characters of the link
      .insert(urlMatch[0], { link: normalize(urlMatch[0]) }) // The link that has been typed
      .insert(" "); // The space character that we typed but don't want to be in the link

    // Transform the input's text
    quill.updateContents(opsWithLink);
  });
};

export default MagicType;
