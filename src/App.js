import { useEffect, useState } from "react";
import { render } from "react-dom";
import "./styles.css";
import {
  convertToUDTStructure,
  generateUdtsWithoutRecTypes,
  getLinks
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

  return (
    <div className="App">
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
