import { useEffect, useState } from "react";
import {
  convertToUDTStructure,
  generateNotRecursiveLinks,
  generateRecursiveLinks,
  data1,
  data2,
  data3,
  data4,
  data5,
  udts1
} from "./gens";

import "./styles.css";
import {
  findNodesToUpdate,
  findNodesToUpdateFlat,
  buildDeepGraph,
  buildFlatGraph,
  getRecursiveNodesFlat,
  getUniquePaths,
  getUniquePathsFlat,
  getMaxNesting
} from "./traverse";

// const udts = udts1;
const udts = convertToUDTStructure(generateNotRecursiveLinks(10));
// const udts = convertToUDTStructure(generateRecursiveLinks(16));
// const udts = convertToUDTStructure(data1);
// const udts = convertToUDTStructure(data2);
// const udts = convertToUDTStructure(data3);
// const udts = convertToUDTStructure(data4);
// const udts = convertToUDTStructure(data5);

export default function App() {
  const [linked, setLinked] = useState({});

  useEffect(() => {
    async function setLinksAsync() {
      const links = await buildDeepGraph(udts);

      setLinked(links);
    }

    setLinksAsync();
  }, []);

  if (Object.keys(linked).length < 1) {
    console.log("loading nested nestedness...");
    return <div>loading nested nestedness...</div>;
  }

  console.log("linked", linked);
  const flatLinks = buildFlatGraph(udts);
  console.log("flatLinks", flatLinks);
  const recursiveNodesFlat = getRecursiveNodesFlat(flatLinks);
  console.log("recursiveNodesFlat", recursiveNodesFlat);

  if (recursiveNodesFlat.length) {
    return (
      <div className="App">
        the structure is recursive
        {recursiveNodesFlat.map((r) => (
          <div>{r}</div>
        ))}
      </div>
    );
  }

  const updatedType = Object.keys(udts)[1];
  console.log("updatedType", updatedType);

  const typeUpdated = findNodesToUpdate(updatedType, linked);
  console.log("typeUpdated", typeUpdated);
  const typeUpdatedFlat = findNodesToUpdateFlat(updatedType, flatLinks);
  console.log("typeUpdatedFlat", typeUpdatedFlat);

  const paths = getUniquePaths(linked);
  console.log("paths", paths);
  const pathsFlat = getUniquePathsFlat(flatLinks);
  console.log("pathsFlat", pathsFlat);
  const maxNesting = getMaxNesting(flatLinks);
  console.log("maxNesting", maxNesting);

  return (
    <div className="App withTrees">
      <pre>
        Flat (max nesting: {maxNesting}): {renderFlat(flatLinks)}
      </pre>
      <pre>Nested: {renderNested(linked)}</pre>
    </div>
  );
}

function getDisplayName(fqn) {
  return udts[fqn].displayName;
}

function renderNested(obj, root = true) {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => {
        return (
          <div key={key} className={!root ? "treeRoot" : ""}>
            <div>{getDisplayName(key)}</div>
            <div style={{ marginLeft: "20px" }}>
              {Object.keys(value).length > 0 && renderNested(value, false)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderFlat(obj) {
  function renderOne([key, links]) {
    return (
      <div key={key} className="treeRoot">
        <div onClick={() => findNodesToUpdateFlat(key, obj)}>
          {getDisplayName(key)}
        </div>
        <div style={{ marginLeft: "20px" }}>
          {links.length > 0 && links.map((l) => renderOne([l, obj[l]]))}
        </div>
      </div>
    );
  }

  return <div>{Object.entries(obj).map(renderOne)}</div>;
}
