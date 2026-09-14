const BRAND = "Cortex";
const LEGACY_BRAND = /AI Organization/g;

function replaceBrand(root = document.body) {
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  for (const textNode of nodes) {
    if (LEGACY_BRAND.test(textNode.nodeValue)) {
      textNode.nodeValue = textNode.nodeValue.replace(LEGACY_BRAND, BRAND);
    }
    LEGACY_BRAND.lastIndex = 0;
  }

  document.title = BRAND;
}

replaceBrand();

const observer = new MutationObserver(() => replaceBrand());
observer.observe(document.documentElement, { childList: true, subtree: true });
