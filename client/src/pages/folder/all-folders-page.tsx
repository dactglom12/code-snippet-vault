import useSWR from "swr";
import { FolderApi } from "@/api/folder-api";
import { PageLayout } from "@/components/layout/page-layout";
import { Folder } from "@/components/folder/folder";
import { FolderListSkeleton } from "@/components/folder/folder-list-skeleton";
import { AddFolderButton } from "@/components/folder/add-folder-button";
import { EmptyFolderState } from "@/components/folder/empty-folders-state";
import { useFolderControls } from "@/hooks/use-folder-controls";
import { DeleteConfirmDialog } from "@/components/dialogs/delete-dialog";

export function AllFoldersPage() {
  const { data, isLoading, mutate } = useSWR("/folders", FolderApi.getFolders);
  const folderControls = useFolderControls();

  const handleDelete = async () => {
    try {
      await folderControls.deleteFolder();
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

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
    return <EmptyFolderState />;
  }

  return (
    <>
      <PageLayout
        title="Your Folders"
        description="Easily organize your code snippets into folders. View, edit, or delete folders to keep your workspace structured and efficient."
        actions={[{ element: <AddFolderButton /> }]}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
          {folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              onDelete={folderControls.openDeleteDialog}
            />
          ))}
        </div>
      </PageLayout>
      <DeleteConfirmDialog
        isOpen={folderControls.isDeleteDialogOpen}
        onClose={folderControls.closeDeleteDialog}
        onDelete={handleDelete}
        title="Delete Folder?"
        description="This will remove the folder, but the snippets inside will remain available and unassigned."
      />
    </>
  );
}
