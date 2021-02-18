export const generateUdtsWithRecTypes = (n) =>
  new Array(n).fill(null).reduce((acc, c, i) => {
    let getKey = (i) => `udt-${i}`;
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

export const generateUdtsWithoutRecTypes = (n) =>
  new Array(n).fill(null).reduce((acc, c, i) => {
    let getKey = (i) => `udt-${i}`;

    acc[getKey(i)] = {
      key: getKey(i),
      links: [
        { link: getKey(i + 2) },
        { link: getKey(i + 4) }
        // { link: getKey(i + 3) },
        // { link: getKey(i + 4) },
        // { link: getKey(i + 5) },
        // { link: getKey(i + 6) },
        // { link: getKey(i + 7) }
      ]
    };
    return acc;
  }, {});

// HELPERS
// makes UDT structure: [{fqn, type: {baseType} || {baseType: LIST, typeArgument}}]
export function convertToUDTStructure(data) {
  return Object.values(data).reduce((acc, { key, links }) => {
    acc[`${"UserDefinedType_"}${key}`] = {
      fqn: `${"UserDefinedType_"}${key}`,
      name: `${"UserDefinedType_"}${key}`,
      displayName: `${"UserDefinedType_"}${key}`,
      nodes: getNodes(links)
    };
    return acc;
  }, {});

  function getNodes(links) {
    return links.map(({ link }, index) => ({
      type: getType({ link, index })
    }));

    function getType({ link, index }) {
      const formatted = `${"UserDefinedType_"}${link}`;
      return index % 2 === 0
        ? { baseType: formatted }
        : {
            baseType: "List",
            typeArgument: formatted
          };
    }
  }
}
