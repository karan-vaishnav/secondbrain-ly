import { ShareIcon } from "../../icons/ShareIcon";

export function Card() {
  return (
    <div>
      <div className="p-8 bg-white rounded-md shadow-sm border border-slate-200 max-w-96">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShareIcon />
              Project Ideas
            </div>
            <div className="flex">
              <ShareIcon />
              <ShareIcon />
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
