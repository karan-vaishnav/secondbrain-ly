export function SidebarItems({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 rounded p-2 font-normal transition-all justify-center sm:justify-start"
    >
      {icon}
      <span className="hidden sm:inline text-lg hover:text-indigo-600">
        {text}
      </span>
    </div>
  );
}
