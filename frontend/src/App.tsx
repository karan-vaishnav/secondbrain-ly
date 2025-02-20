// import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Button
        startIcon={<PlusIcon />}
        variant="primary"
        text="Add Content"
        size="sm"
        onClick={() => {}}
      />
      <Button
        variant="secondary"
        text="Add Content"
        size="md"
        onClick={() => {}}
      />
      <Button
        variant="secondary"
        text="Add Content"
        size="lg"
        onClick={() => {}}
      />
    </>
  );
}

export default App;
