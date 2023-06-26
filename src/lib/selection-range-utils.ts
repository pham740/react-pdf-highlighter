export const getTextNodesInRange = (range: Range) => {
  const container = range.commonAncestorContainer;

  if (container instanceof Text) {
    return [container];
  }
  const walk = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    (node) => {
      if (range.intersectsNode(node)) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  );
  const textNodes = [];
  while (walk.nextNode()) {
    textNodes.push(walk.currentNode);
  }
  return textNodes;
};

export const getClientRectsInRange = (range: Range) => {
  const textNodes = getTextNodesInRange(range);
  if (textNodes.length === 0) {
    console.warn("no text nodes found");
    return [];
  }

  const clientRects = [];
  // text nodes don't have getBoundingClientRect, so we need to create a range
  let tempRange = document.createRange();
  let textNode;
  for (let idx = 0; idx < textNodes.length; idx++) {
    textNode = textNodes[idx];

    tempRange.selectNode(textNode);
    if (idx === 0) {
      tempRange.setStart(textNode, range.startOffset);
    }
    if (idx === textNodes.length - 1) {
      tempRange.setEnd(textNode, range.endOffset);
    }

    clientRects.push(tempRange.getBoundingClientRect());
  }

  return clientRects;
};

export function addMissingSpacesToSelection(range: Range) {
  const { startContainer, endContainer, endOffset, startOffset } = range;

  const stringifiedRange = getTextNodesInRange(range)
    .map((textNode) => textNode.textContent + " ")
    .filter((str) => !/^\s*$/.test(str))
    .join("");

  /*
  We need to determine where to slice depending on whether the first and last nodes
  are text nodes or not. Text nodes comes with an offset, other nodes do not.
  */
  const startIndex = startContainer instanceof Text ? startOffset : 0;
  const endIndex =
    endContainer instanceof Text
      ? stringifiedRange.length - endContainer.length + endOffset
      : undefined;

  return stringifiedRange.slice(startIndex, endIndex).trim();
}
