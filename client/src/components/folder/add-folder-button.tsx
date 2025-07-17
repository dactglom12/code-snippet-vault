import { Link } from "react-router";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function AddFolderButton() {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <Link to="/folders/new">
        <Plus className="w-4 h-4" />
        Add Folder
      </Link>
    </Button>
  );
}
