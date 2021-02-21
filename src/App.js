import { useEffect, useState } from "react";
import {
  convertToUDTStructure,
  generateNotRecursiveLinks,
  generateRecursiveLinks
} from "./gens";

import "./styles.css";
import {
  findNodesToUpdate,
  findNodesToUpdateFlat,
  buildDeepGraph,
  buildFlatGraph,
  getRecursiveNodesFlat,
  getUniquePaths,
  getUniquePathsFlat
} from "./traverse";

// const udts = convertToUDTStructure(generateNotRecursiveLinks(10));
const udts = convertToUDTStructure(generateRecursiveLinks(16));

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
    return <div></div>;
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
  const typeUpdated = findNodesToUpdate("kookoobooboo_2", linked);
  console.log("typeUpdated", typeUpdated);
  const typeUpdatedFlat = findNodesToUpdateFlat("kookoobooboo_2", flatLinks);
  console.log("typeUpdatedFlat", typeUpdatedFlat);

  const paths = getUniquePaths(linked);
  console.log("paths", paths);
  const pathsFlat = getUniquePathsFlat(flatLinks);
  console.log("pathsFlat", pathsFlat);

  return (
    <div className="App withTrees">
      <pre>{renderFlat(flatLinks)}</pre>
      <pre>{renderNested(linked)}</pre>
    </div>
  );
}

function renderNested(obj) {
  return (
    <div>
      {Object.entries(obj).map(([key, value]) => {
        return (
          <>
            <p>{key}</p>
            <div style={{ marginLeft: "20px" }}>
              {Object.keys(value).length > 0 && renderNested(value)}
            </div>
          </>
        );
      })}
    </div>
  );
}

function renderFlat(obj) {
  function renderOne([key, links]) {
    return (
      <>
        <p>{key}</p>
        <div style={{ marginLeft: "20px" }}>
          {links.length > 0 && links.map((l) => renderOne([l, obj[l]]))}
        </div>
      </>
    );
  }

  return <div>{Object.entries(obj).map(renderOne)}</div>;
}
