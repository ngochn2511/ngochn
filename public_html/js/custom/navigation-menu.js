let blockSections = new Map([]);
const headers = document.querySelectorAll(".main-content h3");
headers.forEach((header, index) => {
  const value = header.innerHTML.split(". ")[1];
  blockSections.set(index, value);
});

console.log(blockSections);

async function xxx() {
  const dom = await getDomElement(".main-content");
  console.log("dom", dom);
}

xxx();
