// import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Button
        startIcon={<ShareIcon size="md" />}
        variant="secondary"
        text="Share Brain"
        size="md"
        onClick={() => {}}
      />
      <Button
        startIcon={<PlusIcon size="md" />}
        variant="primary"
        text="Add Content"
        size="md"
        onClick={() => {}}
      />
    </>
  );
}

export default App;
