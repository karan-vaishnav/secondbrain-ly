import { ShareIcon } from "../../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

export function Card({ title, type, link }: CardProps) {
  return (
    <div>
      <div className="p-3 bg-white rounded-md shadow-sm border border-slate-200 max-w-70">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-base">
            <div className="m-3">
              <ShareIcon size="md" />
            </div>
            {title}
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
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet ">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
        </div>
        <div>
          <div className="flex">
            <div className="bg-indigo-100 text-indigo-600 rounded-2xl px-2 m-2 text-normal font-normal">
              #Tag1
            </div>
          </div>
        </div>
        <div className="text-gray-400 font-normal">Added on 11/11/20024</div>
      </div>
    </div>
  );
}
