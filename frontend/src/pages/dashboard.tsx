import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { CreateContentModel } from "../components/ui/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { SideBar } from "../components/ui/SideBar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

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
      <div className="p-4 ml-72 w-screen h-full h-min-screen bg-slate-100">
        <CreateContentModel
          open={modelOpen}
          onClose={() => {
            setModelOpen(false);
          }}
        />

        <div className="w-full mb-4">
          <div className="flex justify-end gap-4">
            <Button
              startIcon={ShareIcon}
              variant="secondary"
              text="Share Brain"
              size="md"
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/secondbrain/share`,
                  {
                    share: true,
                  },{
                    headers: {
                      "Authorization": localStorage.getItem("token")
                    }
                  }
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                alert(shareUrl);
              }}
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
        </div>
        <div className="grid gap-2 grid-cols-4">
          {contents.map(({ type, link, title }) => {
            return <Card type={type} title={title} link={link} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
