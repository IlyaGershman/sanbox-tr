import { useEffect, useState } from "react";

import "./styles.css";
import {
  convertToUDTStructure,
  generateUdtsWithoutRecTypes,
  getLinks,
  getLinksFlat
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

  const flatLinks = getLinksFlat(udts);
  console.log(flatLinks);

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
