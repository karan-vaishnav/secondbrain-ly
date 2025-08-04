import { DeleteIcon } from "../../icons/DeleteIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { LinkIcon } from "../../icons/LinkIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "link" | "document";
  onDelete?: () => void;
  onShare?: (shareUrl: string) => void;
}

const getYouTubeEmbedUrl = (url: string) => {
  try {
    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    console.error("Invalid YouTube URL:", url);
    return url;
  }
};

const getIconComponent = (
  type: "twitter" | "youtube" | "link" | "document"
) => {
  switch (type) {
    case "youtube":
      return <YoutubeIcon />;
    case "twitter":
      return <TwitterIcon />;
    case "document":
      return <DocumentIcon />;
    case "link":
    default:
      return <LinkIcon />;
  }
};

const getDocumentPreviewUrl = (url: string) => {
  if (url.endsWith(".pdf")) {
    return url;
  } else if (url.includes("drive.google.com")) {
    return `https://docs.google.com/gview?url=${url}&embedded=true`;
  } else if (url.endsWith(".doc") || url.endsWith(".docx")) {
    return `https://view.officeapps.live.com/op/embed.aspx?src=${url}`;
  }
  return "";
};

export function Card({ title, type, link, onDelete, onShare }: CardProps) {
  const documentPreviewUrl = getDocumentPreviewUrl(link);
  return (
    <div>
      <div className="p-4 bg-white rounded-xl shadow-md border border-slate-300 w-full min-h-[14rem] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3 text-base font-semibold truncate">
            <div className="flex-shrink-0">{getIconComponent(type)}</div>
            <span className="truncate">{title}</span>
          </div>
          <div className="flex space-x-3 text-gray-500">
            <button
              className="p-1 rounded hover:bg-slate-100 transition"
              onClick={() => {
                if (onShare) {
                  onShare(link);
                }
              }}
              aria-label="Share"
            >
              <ShareIcon size="md" />
            </button>
            <button
              className="p-1 rounded hover:bg-slate-100 transition"
              onClick={onDelete}
              aria-label="Delete"
            >
              <DeleteIcon size="md" />
            </button>
          </div>
        </div>
        <div className="flex-1 pt-2">
          {type === "youtube" && (
            <iframe
              className="w-full h-56 rounded-md shadow-sm"
              src={getYouTubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet w-full">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}

          {type === "link" && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-3 bg-gray-100 rounded-md text-blue-600 text-center cursor-pointer hover:bg-gray-200 transition">
                Open Link
              </div>
            </a>
          )}

          {type === "document" && (
            <div>
              {documentPreviewUrl ? (
                <iframe
                  className="w-full h-56 rounded-md border border-slate-300 shadow-sm"
                  src={documentPreviewUrl}
                  title="Document Preview"
                ></iframe>
              ) : (
                <p className="text-gray-600 text-center py-12">
                  Document preview is not available.
                </p>
              )}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 p-3 bg-gray-100 rounded-md text-blue-600 text-center cursor-pointer hover:bg-gray-200 transition"
              >
                Open Document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
