/**
 * Use it if you know exact the dom element exist in the dom tree
 * If not exist --> This might happen the memory leak issue
 * @param selector
 * @returns {Promise<Element | null>}
 */
const getDomElement = async selector => {
  let frameId;
  while (document.querySelector(selector) === null) {
    // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-loop-func
    await new Promise(resolve => {
      frameId = requestAnimationFrame(resolve);
      // eslint-disable-next-line no-promise-executor-return
      return requestAnimationFrame(resolve);
    });
  }
  if (typeof frameId === "number") cancelAnimationFrame(frameId);
  return document.querySelector(selector);
};

/**
 * Use it if you know exact the dom element exist in the dom tree
 * If not exist --> This might happen the memory leak issue
 * @returns {Promise<NodeListOf<Element> | null>}
 */
const getDomElements = async selectors => {
  let frameId;
  while (document.querySelectorAll(selectors) === null) {
    // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-loop-func
    await new Promise(resolve => {
      frameId = requestAnimationFrame(resolve);
      // eslint-disable-next-line no-promise-executor-return
      return requestAnimationFrame(resolve);
    });
  }
  if (typeof frameId === "number") cancelAnimationFrame(frameId);
  return document.querySelectorAll(selectors);
};

function getKeyMap(map, val) {
  return [...map].find(([_, value]) => val === value)?.[0];
}

async function getBlockIdViewPort() {
  if (isBrowser) {
    const approximatePaddingTop = 30;
    const [symbolSections, header] = await Promise.all([
      getDomElements(".section-detail-info"),
      getDomElement("#header")
    ]);
    const _sections = [...symbolSections];
    const nextViewport = _sections.find(section => {
      const { offsetTop, clientHeight } = section;
      const sectionOffset = offsetTop + clientHeight - approximatePaddingTop;
      const viewPortScroll = window.scrollY + (header?.clientHeight || 0);
      if (sectionOffset >= viewPortScroll) return true;
      return false;
    });

    if (nextViewport) {
      const id = getKeyMap(SectionIdMap, nextViewport.id);
      return id;
    }
  }
}
