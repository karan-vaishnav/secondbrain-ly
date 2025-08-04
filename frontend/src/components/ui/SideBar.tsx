import { BrainIcon } from "../../icons/BrainIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
// import { TagsIcon } from "../../icons/TagsIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";
import { LogOutIcon } from "../../icons/LogOutIcon";

export function SideBar({
  setSelectedCategory,
  showLogout = true,
}: {
  setSelectedCategory: (category: string) => void;
  showLogout?: boolean;
}) {
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    window.location.href = "/signin";
  };
  return (
    <div
      className="
        h-screen bg-white shadow-sm border-r border-slate-200 fixed left-0 top-0
        w-16 sm:w-20 md:w-40 lg:w-56 xl:w-72
        overflow-auto flex flex-col py-4 px-1
      "
    >
      <div
        onClick={() => setSelectedCategory("all")}
        className="cursor-pointer mb-2 flex gap-2 items-center font-semibold text-base sm:text-xl justify-center sm:justify-start"
      >
        <BrainIcon />
        <span className="hidden sm:inline">Second Brainly</span>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
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
          onClick={() => setSelectedCategory("document")}
        />
        <SidebarItems
          text="Links"
          icon={<LinkIcon />}
          onClick={() => setSelectedCategory("link")}
        />
        {showLogout && (
          <SidebarItems
            text="LogOut"
            icon={<LogOutIcon size="md" />}
            onClick={handleLogOut}
          />
        )}
      </div>
    </div>
  );
}
