import type { FolderEntity } from "@/entities/folder-entity";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

type FolderProps = {
  folder: FolderEntity;
  onDelete?: (id: number) => void;
};

export function Folder({ folder, onDelete }: FolderProps) {
  return (
    <Card className="relative group">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">{folder.name}</span>
          <span className="text-sm text-muted-foreground">
            {folder.snippetCount ?? 0} snippet
            {folder.snippetCount === 1 ? "" : "s"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-end gap-2">
        <Button size="sm" variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
        {onDelete && (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(folder.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
