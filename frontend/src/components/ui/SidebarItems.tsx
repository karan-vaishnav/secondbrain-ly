import { ReactElement } from "react";

export function SidebarItems({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex gap-4 cursor-pointer hover:bg-slate-100 rounded p-2 items-center">
      {icon} {text}
    </div>
  );
}
