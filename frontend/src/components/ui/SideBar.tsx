import { BrainIcon } from "../../icons/BrainIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { TagsIcon } from "../../icons/TagsIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItems } from "./SidebarItems";

export function SideBar() {
  return (
    <div className="h-screen bg-white shadow-sm border-r border-slate-200 w-72 fixed left-0 top-0 p-4">
      <div className="m-1 mb-5 flex gap-3 items-center font-semibold text-2xl">
        <BrainIcon />
        Second Brain
      </div>
      <div className="m-4 flex flex-col gap-4">
        <SidebarItems text="Tweets" icon={<TwitterIcon />} />
        <SidebarItems text="Videos" icon={<YoutubeIcon />} />
        <SidebarItems text="Documents" icon={<DocumentIcon />} />
        <SidebarItems text="Links" icon={<LinkIcon />} />
        <SidebarItems text="Tags" icon={<TagsIcon />} />
      </div>
    </div>
  );
}
