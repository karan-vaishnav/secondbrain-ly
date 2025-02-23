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
import { ShareModal } from "../components/ui/ShareLinkModal";

type ContentType = "link" | "twitter" | "youtube";

interface Content {
  _id: string;
  link: string;
  type: ContentType;
  title: string;
}

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const { contents, refresh } = useContent() as {
    contents: Content[];
    refresh: () => void;
  };
  const [localContents, setLocalContents] = useState<Content[]>(contents);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    refresh();
    setLocalContents(contents);
  }, [modelOpen, contents]);

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/secondbrain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const generatedShareUrl = `https://secondbrain-api.vercel.app/share/${response.data.hash}`;
      setShareUrl(generatedShareUrl);
      setShareModalOpen(true);
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to generate shareable link.");
    }
  };

  const filteredContents =
    selectedCategory === "all"
      ? localContents
      : localContents.filter((item) => item.type === selectedCategory);

  const handleDelete = async (id: string, index: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setLocalContents((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content. Please try again.");
    }
  };

  return (
    <div className="flex">
      <SideBar setSelectedCategory={setSelectedCategory} />
      <div className="p-4 ml-72 w-screen h-screen h-min-screen bg-slate-100">
        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
        />

        <ShareModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareUrl={shareUrl}
        />

        <div className="w-full mb-4 flex justify-end gap-4">
          <Button
            startIcon={ShareIcon}
            variant="secondary"
            text="Share Brain"
            size="md"
            onClick={handleShare}
          />
          <Button
            startIcon={PlusIcon}
            variant="primary"
            text="Add Content"
            size="md"
            onClick={() => setModelOpen(true)}
          />
        </div>

        <div className="grid gap-2 grid-cols-4">
          {filteredContents.map(({ _id, type, link, title }, index) => (
            <Card
              key={_id}
              type={type}
              title={title}
              link={link}
              onDelete={() => handleDelete(_id, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
