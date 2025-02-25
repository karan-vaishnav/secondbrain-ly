import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { SideBar } from "../components/ui/SideBar";
import axios from "axios";
import { BACKEND_URL } from "../config";

type ContentType = "link" | "twitter" | "youtube" | "document";

interface Content {
  _id: string;
  link: string;
  type: ContentType;
  title: string;
}

function SharedDashboard() {
  const { hash } = useParams<{ hash: string }>();
  const [content, setContent] = useState<Content[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      if (!hash) return;

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/secondbrain/${hash}`
        );

        if (response.data) {
          setUsername(response.data.username);
          setContent(response.data.content);
        }
        console.log(content);
      } catch (error) {
        console.error("Error fetching shared content:", error);
      }
    };

    fetchSharedContent();
  }, [hash]);

  return (
    <div className="flex h-screen bg-slate-100">
      <SideBar setSelectedCategory={() => {}} showLogout={false}/>

      <div className="p-6 ml-72 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {username}'s Shared Brain
        </h1>
        {content ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {content.map(({ _id, type, link, title }) => (
              <Card key={_id} type={type} title={title} link={link} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-lg text-center mt-10">
            No shared content available.
          </p>
        )}
      </div>
    </div>
  );
}

export default SharedDashboard;
