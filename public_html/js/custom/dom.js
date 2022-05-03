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
  return [...map].find(([_, value]) => val === value.hashId)?.[1]?.index;
}

async function getBlockIdViewPort() {
  const approximatePaddingTop = 80;
  const [symbolSections, header] = await Promise.all([
    getDomElements(".main-content h3"),
    getDomElement("header")
  ]);
  console.log("getBlockIdViewPort  👻  header", header?.clientHeight);
  const _sections = [...symbolSections];
  const nextViewport = _sections.find(section => {
    const { offsetTop, clientHeight } = section;
    const sectionOffset = offsetTop + clientHeight;
    const viewPortScroll = window.scrollY + (header?.clientHeight || 0);
    if (sectionOffset >= viewPortScroll) return true;
    return false;
  });

  if (nextViewport) {
    const id = getKeyMap(blockSections, "#" + nextViewport.id);

    return id;
  }
}

function scrollToView(selector, topPosition) {
  const section = document.querySelector(selector);
  if (section) {
    const currentUrl = window.location.href;
    const fragmentUrls = currentUrl.split("#");

    if (fragmentUrls.length !== 0) {
      const baseUrl = fragmentUrls[0];
      window.location.href = baseUrl + selector;
    } else {
      window.location.href += selector;
    }

    const { position, top } = section.style;
    section.style.position = "relative";
    section.style.top = topPosition + "px";
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    section.style.top = top;
    section.style.position = position;
  }
}
