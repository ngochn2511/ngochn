let blockSections = new Map([]);
const sectionTitle = [];
const headers = document.querySelectorAll(".main-content h3");
headers.forEach((header, index) => {
  const value = header.innerHTML.split(". ")[1] || header.innerHTML;
  sectionTitle.push(value);
  blockSections.set(value, { index, value, hashId: `#${header.id}` });
});

async function makeMagicNavigation() {
  const menu = await getDomElement("#navigation-menu");
  blockSections.forEach((value, key) => {
    const child = document.createElement("div");
    child.dataset.index = value.index;
    child.ariaSelected = false;
    child.ariaLabel = key;
    child.setAttribute("role", "tab");
    child.innerText = key;

    child.style.cursor = "pointer";
    child.style.borderRadius = "4px";
    child.style.padding = "4px";
    child.style.paddingLeft = "12px";

    child.addEventListener("mouseover", () => {
      child.style.background = "rgba(121,82,179,0.1)";
    });

    child.addEventListener("mouseleave", () => {
      child.style.background = "initial";
    });

    child.addEventListener("click", e => {
      scrollToView(value.hashId, -100);
    });

    menu.append(child);
  });
}

document.addEventListener(
  "scroll",
  throttle(async () => {
    const id = await getBlockIdViewPort();
    console.log("document.addEventListener  👻  id", id);
  }, 100)
);

makeMagicNavigation();
