import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModel } from "../components/ui/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/ui/SideBar";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(true);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [modelOpen]);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="p-4 ml-72 w-screen h-screen h-min-screen bg-slate-100 grid-cols-3">
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
          {contents.map(({ type, link, title }) => {
            return <Card type={type} title={title} link={link} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
