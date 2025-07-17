import { SnippetApi } from "@/api/snippet-api";
import { useState } from "react";

export function useSnippetControls() {
  const [snippetIdToDelete, setSnippetIdToDelete] = useState<number>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const openDeleteDialog = (id: number) => {
    setSnippetIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const deleteSnippet = async () => {
    if (!snippetIdToDelete) {
      return;
    }

    try {
      const response = await SnippetApi.deleteSnippet(snippetIdToDelete);

      if (response.status !== 204) {
        throw new Error("Snippet not deleted successfully");
      }

      setSnippetIdToDelete(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    deleteSnippet,
    openDeleteDialog,
    closeDeleteDialog,
    isDeleteDialogOpen,
  };
}
