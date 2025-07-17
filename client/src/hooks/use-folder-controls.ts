import { FolderApi } from "@/api/folder-api";
import { useState } from "react";

export function useFolderControls() {
  const [folderIdToDelete, setFolderIdToDelete] = useState<number>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openDeleteDialog = (id: number) => {
    setFolderIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const deleteFolder = async () => {
    if (!folderIdToDelete) {
      return;
    }

    try {
      const response = await FolderApi.deleteFolder(folderIdToDelete);

      if (response.status !== 204) {
        throw new Error("Folder not deleted successfully");
      }

      setFolderIdToDelete(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteFolder,
    openDeleteDialog,
    closeDeleteDialog,
    isDeleteDialogOpen,
  };
}
