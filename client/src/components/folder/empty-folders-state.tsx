import { FolderIcon } from "lucide-react";
import { AddFolderButton } from "./add-folder-button";
import { EmptyEntityState } from "../empty-state/empty-entity-state";

export function EmptyFolderState() {
  return (
    <EmptyEntityState
      icon={<FolderIcon className="w-10 h-10" />}
      action={<AddFolderButton />}
      message="Folders help you organize your snippets by category."
      title="You don't have any folders yet."
    />
  );
}
