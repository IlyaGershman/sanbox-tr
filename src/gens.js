export const generateRecursiveLinks = (n) =>
  new Array(n).fill(null).reduce((acc, c, i) => {
    let getKey = (i) => `${i}`;
    acc[getKey(i)] = {
      key: getKey(i),
      links: [
        { link: getKey(i - 1) },
        { link: getKey(i - 2) },
        { link: getKey(i - 3) },
        { link: getKey(i) },
        { link: getKey(i + 1) },
        { link: getKey(i + 2) },
        { link: getKey(i + 3) }
      ]
    };
    return acc;
  }, {});

export const generateNotRecursiveLinks = (n) =>
  new Array(n).fill(null).reduce((acc, c, i) => {
    let getKey = (i) => `${i}`;

    acc[getKey(i)] = {
      key: getKey(i),
      links: [
        { link: getKey(i + 1) },
        { link: getKey(i + 2) },
        { link: getKey(i + 3) },
        { link: getKey(i + 4) },
        { link: getKey(i + 5) },
        { link: getKey(i + 6) },
        { link: getKey(i + 7) }
      ]
    };
    return acc;
  }, {});

export function convertToUDTStructure(data) {
  return Object.values(data).reduce((acc, { key, links }) => {
    acc[`${"kookoobooboo_"}${key}`] = {
      fqn: `${"kookoobooboo_"}${key}`,
      name: `${"kookoobooboo_"}${key}`,
      displayName: `${"kookoobooboo_"}${key}`,
      nodes: getNodes(links)
    };
    return acc;
  }, {});

  function getNodes(links) {
    return links.map(({ link }, index) => ({
      type: getType({ link, index })
    }));

    function getType({ link, index }) {
      const formatted = `${"kookoobooboo_"}${link}`;
      return index % 2 === 0
        ? { baseType: formatted }
        : {
            baseType: "List",
            typeArgument: formatted
          };
    }
  }
}

export const data1 = {
  a: { key: "a", links: [{ link: "b" }, { link: "c" }, { link: "d" }] },
  b: { key: "b", links: [{ link: "q" }, { link: "d" }, { link: "e" }] },
  c: { key: "c", links: [{ link: "a" }, { link: "b" }, { link: "c" }] },
  d: { key: "d", links: [{ link: "e" }, { link: "e" }, { link: "e" }] },
  e: { key: "e", links: [{ link: "a" }, { link: "b" }, { link: "c" }] },
  j: { key: "j", links: [{ link: "a" }, { link: "b" }, { link: "c" }] }
};

export const data2 = {
  a: { key: "a", links: [{ link: "b" }, { link: "c" }] },
  b: { key: "b", links: [{ link: "c" }] },
  c: { key: "c", links: [{ link: "a" }, { link: "b" }, { link: "c" }] }
};

export const data3 = {
  a: { key: "a", links: [{ link: "a" }, { link: "b" }, { link: "c" }] },
  b: { key: "b", links: [{ link: "r" }] },
  c: { key: "c", links: [{ link: "r" }, { link: "a" }, { link: "c" }] }
};

export const data4 = {
  a: { key: "a", links: [{ link: "b" }] },
  b: { key: "b", links: [{ link: "b" }, { link: "a" }] }
};

export const data5 = {
  a: { key: "a", links: [{ link: "b" }] },
  b: { key: "b", links: [{ link: "c" }, { link: "d" }] },
  c: { key: "c", links: [{}, {}] },
  d: { key: "d", links: [{}, {}] },
  e: { key: "e", links: [{}] },
  f: { key: "f", links: [{ link: "g" }] },
  g: { key: "g", links: [{}] },
  h: { key: "h", links: [{}] }
};

export const linkedObjects = [data1, data2, data3, data4, data5];
