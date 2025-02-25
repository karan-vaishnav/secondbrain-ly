import { BrainIcon } from "../../icons/BrainIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { TagsIcon } from "../../icons/TagsIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";
import { LogOutIcon } from "../../icons/LogOutIcon";

export function SideBar({
  setSelectedCategory,
}: {
  setSelectedCategory: (category: string) => void;
}) {
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    window.location.href = "/signin";
  };
  return (
    <div className="h-screen bg-white shadow-sm border-r border-slate-200 w-72 fixed left-0 top-0 p-4">
      <div
        onClick={() => setSelectedCategory("all")}
        className="cursor-pointer m-1 mb-5 flex gap-3 items-center font-semibold text-2xl"
      >
        <BrainIcon />
        Second Brainly
      </div>
      <div className="m-4 flex flex-col gap-4">
        <SidebarItems
          text="Tweets"
          icon={<TwitterIcon />}
          onClick={() => setSelectedCategory("twitter")}
        />
        <SidebarItems
          text="Videos"
          icon={<YoutubeIcon />}
          onClick={() => setSelectedCategory("youtube")}
        />
        <SidebarItems
          text="Documents"
          icon={<DocumentIcon />}
          onClick={() => setSelectedCategory("documents")}
        />
        <SidebarItems
          text="Links"
          icon={<LinkIcon />}
          onClick={() => setSelectedCategory("link")}
        />
        <SidebarItems
          text="Tags"
          icon={<TagsIcon />}
          onClick={() => setSelectedCategory("tags")}
        />
        <SidebarItems
          text="LogOut"
          icon={<LogOutIcon size="md" />}
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
}
