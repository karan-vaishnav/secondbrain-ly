import { CrossIcon } from "../../icons/CrossIcon";
import { Input } from "../input/InputComponent";
import { Button } from "./Button";

export function CreateContentModel({ open, onClose }) {
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
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="primary"
                  size="md"
                  text="Submit"
                  onClick={() => {}}
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
