import { ShareIcon } from "../../icons/ShareIcon";

export function Card() {
  return (
    <div>
      <div className="p-3 bg-white rounded-md shadow-sm border border-slate-200 max-w-70">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-base">
            <div className="m-3">
              <ShareIcon size="md" />
            </div>
            Project Ideas
          </div>
          <div className="flex">
            <div className="m-2">
              <ShareIcon size="md" />
            </div>
            <div className="m-2">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>
        <div>
        
        </div>
        <div></div>
      </div>
    </div>
  );
}
