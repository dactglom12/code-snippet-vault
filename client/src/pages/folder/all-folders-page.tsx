import useSWR from "swr";
import { Folder as FolderIcon, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderApi } from "@/api/folder-api";
import { PageLayout } from "@/components/layout/page-layout";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

export function AllFoldersPage() {
  const { data, isLoading } = useSWR("/folders", FolderApi.getFolders);

  if (isLoading) {
    return (
      <PageLayout
        title="Your Folders"
        description="Easily organize your code snippets into folders. View, edit, or delete folders to keep your workspace structured and efficient."
      >
        <FolderListSkeleton />
      </PageLayout>
    );
  }

  if (!data) {
    return null;
  }

  const folders = data.data.folders;

  if (folders.length === 0) {
    return (
      <PageLayout
        title="Your Folders"
        description="Easily organize your code snippets into folders. View, edit, or delete folders to keep your workspace structured and efficient."
      >
        <div className="flex flex-col items-center justify-center text-center py-20 text-muted-foreground space-y-4">
          <FolderIcon className="w-10 h-10" />
          <p className="text-lg">You don&apos;t have any folders yet.</p>
          <p className="text-sm">
            Folders help you organize your snippets by category.
          </p>
          <AddFolderButton />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Your Folders"
      description="Easily organize your code snippets into folders. View, edit, or delete folders to keep your workspace structured and efficient."
      actions={[{ element: <AddFolderButton /> }]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
        {folders.map((folder) => (
          <Card key={folder.id} className="relative group">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
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
              <Button size="sm" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}

function AddFolderButton() {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <Link to="/folders/new">
        <Plus className="w-4 h-4" />
        Add Folder
      </Link>
    </Button>
  );
}

function FolderListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="space-y-4 p-4">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-2/3" /> {/* Folder name */}
            <Skeleton className="h-4 w-1/3" /> {/* Snippet count */}
          </CardHeader>
          <CardContent className="flex justify-end gap-2">
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit button */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Delete button */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
