import _ from "lodash";

let delay = (ms = 0) => new Promise((r) => setTimeout(r, ms));

export const getUniqueArrays = (arrays) => {
  return arrays.filter((cur) => {
    const withoutSelf = arrays.filter((l) => l !== cur);
    return !withoutSelf.some(
      (link) => _.endsWith(link, cur) || _.startsWith(link, cur)
    );
  });
};

// {a: {b: {c: {d: {}}},c: {d: {}},d: {}}, b: {c,d}
export const buildDeepGraph = (udts) => {
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

  return delay().then(() => linksOnly);
};

export function findNodesToUpdate(name, nestedGraph) {
  if (!nestedGraph[name]) return [];

  let updated = {};
  let queue = [nestedGraph[name]];
  while (queue.length > 0) {
    let cur = queue.shift();
    Object.keys(cur).forEach((key) => {
      if (!updated[key]) {
        updated[key] = key;
        queue.push(cur[key]);
      }
    });
  }

  return Object.keys(updated);
}

export function getUniquePaths(nestedGraph) {
  if (Object.keys(nestedGraph).length < 1) return null;

  let paths = [];
  let queue = Object.keys(nestedGraph).map((key) => ({ key, path: [] }));

  while (queue.length > 0) {
    let { path, key } = queue.shift();
    const nextObj = nestedGraph[key];
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

  return getUniqueArrays(paths);
}

// {a: [b,c,d], b: [c,d]}
export const buildFlatGraph = (udts) => {
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

export function findNodesToUpdateFlat(name, flatGraph) {
  let updated = {};
  let queue = [name];

  while (queue.length > 0) {
    let id = queue.shift();
    let links = flatGraph[id];

    links &&
      links.forEach((link) => {
        if (!updated[link]) {
          updated[link] = link;
          queue = [...queue, link];
        }
      });
  }
  console.log(Object.keys(updated));
  return Object.keys(updated);
}

export function getUniquePathsFlat(flatGraph) {
  if (Object.keys(flatGraph).length < 1) return null;

  let paths = {};
  let queue = Object.keys(flatGraph).map((key) => ({ key, path: [] }));

  while (queue.length > 0) {
    let { path, key } = queue.shift();
    const nextObjKeys = flatGraph[key];
    const newPath = [...path, key];
    if (nextObjKeys.length) {
      nextObjKeys.forEach((key) => {
        queue.push({ path: newPath, key });
      });
    } else {
      paths[newPath] = newPath;
    }
  }

  return getUniqueArrays(Object.values(paths));
}

export function getMaxNesting(flatGraph) {
  const paths = getUniquePathsFlat(flatGraph);

  return (
    Math.max.apply(null, paths.length ? paths.map((p) => p.length) : [1]) - 1
  );
}

export function getRecursiveNodesFlat(flatGraph) {
  if (Object.keys(flatGraph).length < 1) return null;

  let paths = [];
  let queue = Object.keys(flatGraph).map((key) => ({ key, path: [] }));
  let memo = new Map();

  while (queue.length > 0) {
    let { path, key } = queue.shift();
    const search = path[0];
    const memoKey = `${search}${key}`; // ${path[path.length - 1]}

    const nextObjKeys = flatGraph[key];
    const newPath = [...path, key];

    if (key === search) {
      paths.push(newPath);
    } else if (nextObjKeys.length) {
      if (!memo.has(memoKey)) {
        memo.set(memoKey);

        nextObjKeys.forEach((key) => {
          queue.push({ path: newPath, key });
        });
      }
    }
  }

  return Array.from(new Set(_.flattenDeep(paths)));
}
