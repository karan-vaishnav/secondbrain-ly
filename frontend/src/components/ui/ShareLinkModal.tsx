import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "../../components/ui/Button";

export function ShareModal({
  open,
  onClose,
  shareUrl,
}: {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  if (!open) return null;

  return (
    <div className="w-screen h-screen bg-zinc-900/70 fixed left-0 top-0 flex justify-center items-center">
      <div className="bg-white rounded p-4 flex flex-col w-96">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold">Share Brain</h2>
          <div onClick={onClose} className="cursor-pointer">
            <CrossIcon size="md" />
          </div>
        </div>
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="border p-2 rounded w-full mb-2"
        />
        <div className="flex justify-center gap-2">
          <Button
            variant="primary"
            text="Copy Link"
            size="md"
            onClick={copyToClipboard}
          />
          <Button
            variant="secondary"
            text="Close"
            size="md"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
