import { FolderIcon } from "lucide-react";
import { AddFolderButton } from "./add-folder-button";

export function EmptyFolderState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground space-y-4">
      <FolderIcon className="w-10 h-10" />
      <p className="text-lg">You don&apos;t have any folders yet.</p>
      <p className="text-sm">
        Folders help you organize your snippets by category.
      </p>
      <AddFolderButton />
    </div>
  );
}
