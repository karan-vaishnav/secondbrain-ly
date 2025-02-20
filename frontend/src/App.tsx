import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button
        variant="primary"
        text="Add Content"
        size="lg"
        onClick={() => {}}
      />
    </>
  );
}

export default App;
