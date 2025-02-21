// import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <>
      <Button
        startIcon={ShareIcon}
        variant="secondary"
        text="Share Brain"
        size="md"
        onClick={() => {}}
      />
      <Button
        startIcon={PlusIcon}
        variant="primary"
        text="Add Content"
        size="md"
        onClick={() => {}}
      />

      <Card
        type="twitter"
        title="100xDevs"
        link="https://x.com/kirat_tw/status/1892670402842771717"
      />

      <Card
        type="youtube"
        title="100xDevs"
        link="https://www.youtube.com/watch?v=lueXr-LJJA0"
      />
    </>
  );
}

export default App;
