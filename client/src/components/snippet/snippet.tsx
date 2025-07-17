import type { Language } from "@/entities/language-entity";
import { CopyBlock, dracula } from "react-code-blocks";
import { Button } from "../ui/button";
import { Folder, Pencil, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { languageToIcon } from "@/constants/snippet-constants";
import type { FolderEntity } from "@/entities/folder-entity";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type CodeSnippetProps = {
  language: Language;
  content: string;
  title: string;
  folder?: FolderEntity;
  hideControls?: boolean;
};

export function CodeSnippet({
  hideControls = false,
  ...props
}: CodeSnippetProps) {
  useEffect(() => {
    const copyButtons = document.querySelectorAll('[aria-label="Copy Code"]');
    if (copyButtons) {
      copyButtons.forEach((btn) => {
        const copyButton = btn as HTMLElement;
        if (hideControls) {
          copyButton.style.display = "none";
          copyButton.style.visibility = "hidden";
        } else {
          copyButton.style.zIndex = "10";
          copyButton.style.top = "-24px";
          copyButton.style.right = "84px";
          copyButton.style.background = "none";
        }
      });
    }
  }, [hideControls]);

  const Icon = languageToIcon[props.language];

  const isRightPanelDisplayed = !hideControls || props.folder;

  return (
    <div className="relative mt-12">
      <div className="box-border p-1 pl-4 absolute -top-8 w-full bg-gray-700 z-10 rounded-tl-sm rounded-tr-sm flex justify-between items-center">
        <div className="flex items-center">
          <Icon />
          <pre className="text-md font-medium text-white ml-4">
            {props.title}
          </pre>
        </div>
        {isRightPanelDisplayed && (
          <div className="flex items-center">
            {props.folder && (
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center gap-1 text-sm",
                  !hideControls && "mr-10"
                )}
              >
                <Folder className="h-4 w-4" />
                {props.folder.name}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>
      <CopyBlock
        language={props.language}
        text={props.content}
        showLineNumbers
        theme={dracula}
        wrapLongLines
      />
    </div>
  );
}
