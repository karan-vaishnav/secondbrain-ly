import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Input } from "../input/InputComponent";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Link = "link",
  Document = "document",
}

export function CreateContentModel({ open, onClose }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/api/v1/content`,
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-zinc-900/70 fixed left-0 top-0 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white rounded p-4 flex flex-col">
              <div className="flex justify-end mb-2">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon size="md" />
                </div>
              </div>
              <div className="mb-2 gap-2 flex flex-col">
                <Input ref={titleRef} placeholder={"Title"} />
                <Input ref={linkRef} placeholder={"Link"} />
              </div>
              <div>
                <h1>Type</h1>
                <div className="flex gap-1 m-2 items-center justify-center pb-2">
                  <Button
                    text="Youtube"
                    variant={
                      type === ContentType.Youtube ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      setType(ContentType.Youtube);
                    }}
                  />
                  <Button
                    text="Twitter"
                    variant={
                      type === ContentType.Twitter ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      setType(ContentType.Twitter);
                    }}
                  />
                  <Button
                    text="Link"
                    variant={
                      type === ContentType.Link ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      setType(ContentType.Link);
                    }}
                  />
                  <Button
                    text="Document"
                    variant={
                      type === ContentType.Document ? "primary" : "secondary"
                    }
                    size="sm"
                    onClick={() => {
                      setType(ContentType.Document);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="md"
                  text="Submit"
                  onClick={addContent}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
