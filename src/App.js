import { useEffect, useState } from "react";
import { convertToUDTStructure, generateNotRecursiveLinks } from "./gens";

import "./styles.css";
import {
  findTypesToUpdate,
  findTypesToUpdateFlat,
  getLinks,
  getLinksFlat,
  getUniquePaths,
  getUniquePathsFlat
} from "./traverse";

const udts = convertToUDTStructure(generateNotRecursiveLinks(10));

export default function App() {
  const [linked, setLinked] = useState({});

  useEffect(() => {
    async function setLinksAsync() {
      const links = await getLinks(udts);

      setLinked(links);
    }

    setLinksAsync();
  }, []);

  if (Object.keys(linked).length < 1) {
    console.log("loading nested nestedness...");
    return <div></div>;
  }

  console.log("linked", linked);
  const flatLinks = getLinksFlat(udts);
  console.log("flatLinks", flatLinks);
  const typeUpdated = findTypesToUpdate("kookoobooboo_2", linked);
  console.log("typeUpdated", typeUpdated);
  const typeUpdatedFlat = findTypesToUpdateFlat("kookoobooboo_2", flatLinks);
  console.log("typeUpdatedFlat", typeUpdatedFlat);

  const paths = getUniquePaths(linked);
  console.log("paths", paths);
  const pathsFlat = getUniquePathsFlat(flatLinks);
  console.log("pathsFlat", pathsFlat);

  return (
    <div className="App">
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
