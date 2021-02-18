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
