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

let delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const getLinks = (udts) => {
  let linksOnly = Object.values(udts).reduce((acc, udt, i) => {
    function getLinks(nodes = []) {
      return nodes
        .filter((p) => udts[p.type.baseType] || udts[p.type.typeArgument])
        .reduce((ac, p) => {
          let link = p.type.typeArgument || p.type.baseType;
          setTimeout(() => (ac[link] = acc[link]), 0);
          return ac;
        }, {});
    }

    acc[udt.fqn] = getLinks(udt.nodes);
    return acc;
  }, {});

  return delay(0).then(() => linksOnly);
};

export function findTypesToUpdate(type, typesTree) {
  console.log(typesTree[type]);
  let updated = {};
  let queue = [typesTree[type]];
  while (queue.length > 0) {
    let cur = queue.shift();
    Object.keys(cur).forEach((key) => {
      if (!updated[key]) {
        updated[key] = key;
        queue.push(cur[key]);
      }
    });
  }

  return updated;
}
