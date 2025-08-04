import { ReactElement } from "react";

export function SidebarItems({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 cursor-pointer hover:bg-slate-100 rounded p-2 items-center font-normal transition-all"
    >
      <div>{icon}</div>
      <span className="hidden sm:inline text-lg hover:text-indigo-600">
        {text}
      </span>
    </div>
  );
}
