import "./styles.css";
import {
  convertToUDTStructure,
  generateUdtsWithoutRecTypes,
  getLinks
} from "./traverse";

export default function App() {
  const udts = convertToUDTStructure(generateUdtsWithoutRecTypes(20));

  const linkedTypes = getLinks(udts);

  console.log(linkedTypes);

  return <div className="App">{JSON.stringify(linkedTypes)}</div>;
}
