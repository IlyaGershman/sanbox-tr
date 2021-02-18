let delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const getLinks = (udts) => {
  let linksOnly = Object.values(udts).reduce((acc, udt, i) => {
    function getLinks(nodes = []) {
      return nodes
        .filter((p) => udts[p.type.baseType] || udts[p.type.typeArgument])
        .reduce((ac, p) => {
          let link = p.type.typeArgument || p.type.baseType;
          // deep nest objects
          setTimeout(() => (ac[link] = acc[link]), 0);
          return ac;
        }, {});
    }

    acc[udt.fqn] = getLinks(udt.nodes);
    return acc;
  }, {});

  return delay(0).then(() => linksOnly);
};

export const getLinksFlat = (udts) => {
  let linksOnly = Object.values(udts).reduce((acc, udt, i) => {
    function getLinks(nodes = []) {
      return nodes
        .filter((p) => udts[p.type.baseType] || udts[p.type.typeArgument])
        .map((p) => p.type.typeArgument || p.type.baseType);
    }

    acc[udt.fqn] = getLinks(udt.nodes);
    return acc;
  }, {});

  return linksOnly;
};

export function findTypesToUpdate(type, typesTree) {
  if (!typesTree[type]) return null;

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

export function findTypesToUpdateFlat(type, typesTreeFlat) {
  let updated = {};
  let queue = [...typesTreeFlat[type]];
  while (queue.length > 0) {
    let id = queue.shift();
    let links = typesTreeFlat[id];

    links &&
      links.forEach((link) => {
        if (!updated[link]) {
          updated[link] = link;
          queue = [...queue, typesTreeFlat[link]];
        }
      });
  }

  return updated;
}

export function getUniquePaths(typesTree) {
  if (Object.keys(typesTree).length < 1) return null;

  let paths = [];
  let queue = Object.keys(typesTree).map((key) => ({ key, path: [] }));

  while (queue.length > 0) {
    let { path, key } = queue.shift();
    const nextObj = typesTree[key];
    const nextObjKeys = Object.keys(nextObj);
    const newPath = [...path, key];
    if (nextObjKeys.length) {
      nextObjKeys.forEach((key) => {
        queue.push({ path: newPath, key });
      });
    } else {
      paths.push(newPath);
    }
  }

  return paths;
}

export function getUniquePathsFlat(typesTreeFlat) {
  if (Object.keys(typesTreeFlat).length < 1) return null;

  let paths = {};
  let queue = Object.keys(typesTreeFlat).map((key) => ({ key, path: [] }));

  while (queue.length > 0) {
    let { path, key } = queue.shift();
    const nextObjKeys = typesTreeFlat[key];
    const newPath = [...path, key];
    if (nextObjKeys.length) {
      nextObjKeys.forEach((key) => {
        queue.push({ path: newPath, key });
      });
    } else {
      paths[newPath] = newPath;
    }
  }

  return Object.values(paths);
}
