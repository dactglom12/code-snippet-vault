import { Link } from "react-router";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function AddSnippetButton() {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <Link to="/snippets/new">
        <Plus className="w-4 h-4" />
        Add Snippet
      </Link>
    </Button>
  );
}
