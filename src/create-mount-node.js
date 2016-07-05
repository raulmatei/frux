export default function createMountNode() {
  const bodyElement = document.body;
  const nextNode = bodyElement.firstChild;
  const rootElement = document.createElement('div');

  bodyElement.insertBefore(rootElement, nextNode);
  return rootElement;
}
