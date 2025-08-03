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
      <div className="p-3 bg-white rounded-md shadow-sm border border-slate-200 w-full min-h-[12rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-base">
            <div className="m-3">{getIconComponent(type)}</div>
            {title}
          </div>
          <div className="flex">
            <div
              className="m-2 cursor-pointer"
              onClick={() => {
                if (onShare) {
                  onShare(link);
                }
              }}
            >
              <ShareIcon size="md" />
            </div>
            <div className="m-2 cursor-pointer" onClick={onDelete}>
              <DeleteIcon size="md" />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full h-56"
              src={getYouTubeEmbedUrl(link)}
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

          {type === "link" && (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <div className="p-2 bg-gray-100 rounded-md text-blue-600 text-center cursor-pointer">
                Open Link
              </div>
            </a>
          )}
          {type === "document" && (
            <div>
              {documentPreviewUrl ? (
                <iframe
                  className="w-full h-56 border"
                  src={documentPreviewUrl}
                  title="Document Preview"
                ></iframe>
              ) : (
                <p className="text-gray-600 text-center">
                  Document preview is not available.
                </p>
              )}
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 p-2 bg-gray-100 rounded-md text-blue-600 text-center cursor-pointer"
              >
                Open Document
              </a>
            </div>
          )}
        </div>
        {/* <div>
          <div className="flex">
            <div className="bg-indigo-100 text-indigo-600 rounded-2xl px-2 m-2 text-normal font-normal">
              #Tag1
            </div>
          </div>
        </div>
        <div className="text-gray-400 font-normal">Added on 11/11/20024</div> */}
      </div>
    </div>
  );
}
