import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { CreateContentModel } from "./components/ui/CreateContentModel";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { SideBar } from "./components/ui/SideBar";

function App() {
  const [modelOpen, setModelOpen] = useState(true);
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-4 ml-72 w-screen h-screen h-min-screen bg-slate-100">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />

        <div className="flex justify-end gap-4">
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
            onClick={() => {
              setModelOpen(true);
            }}
          />
        </div>
        <div className="flex gap-2">
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
        </div>
      </div>
    </div>
  );
}

export default App;
