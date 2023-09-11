import { useState } from "react";
import Form from "./From";
import Scene from "./Scene";

function App() {
  const [vertices, setVertices] = useState(null);
  return (
    <>
      <Form onLoad={setVertices}/>
      {vertices ? <Scene vertices={vertices}/> : null}
    </>
  );
}

export default App;
