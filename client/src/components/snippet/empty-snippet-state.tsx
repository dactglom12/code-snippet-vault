import { FileCode2 } from "lucide-react";
import { AddSnippetButton } from "./add-snippet-button";
import { EmptyEntityState } from "../empty-state/empty-entity-state";

export function EmptySnippetState() {
  return (
    <EmptyEntityState
      icon={<FileCode2 className="w-10 h-10" />}
      action={<AddSnippetButton />}
      message="Snippets help you save and organize useful bits of code."
      title="You don’t have any snippets yet."
    />
  );
}
