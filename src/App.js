import { useEffect, useState } from "react";
import { convertToUDTStructure, generateUdtsWithoutRecTypes } from "./gens";

import "./styles.css";
import {
  findTypesToUpdate,
  findTypesToUpdateFlat,
  getLinks,
  getLinksFlat,
  getUniquePaths,
  getUniquePathsFlat
} from "./traverse";

const udts = convertToUDTStructure(generateUdtsWithoutRecTypes(10));

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
    console.log("sssss");

    return <div></div>;
  }

  const flatLinks = getLinksFlat(udts);
  const typeUpdated = findTypesToUpdate("UserDefinedType_udt-2", linked);
  const typeUpdatedFlat = findTypesToUpdateFlat(
    "UserDefinedType_udt-2",
    flatLinks
  );

  const paths = getUniquePaths(linked);
  console.log("paths", paths);
  const pathsFlat = getUniquePathsFlat(flatLinks);
  console.log("pathsFlat", pathsFlat);

  // console.log("typeUpdated", typeUpdated);
  // console.log("typeUpdatedFlat", typeUpdatedFlat);

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
