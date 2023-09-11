import { useState } from "react";
import Form from "./Form.jsx";
import Scene from "./Scene.jsx";

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
