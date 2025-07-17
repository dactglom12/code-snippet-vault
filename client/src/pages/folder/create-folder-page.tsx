import { FolderApi } from "@/api/folder-api";
import { CreateFolderForm } from "@/components/folder/create-folder";
import { PageLayout } from "@/components/layout/page-layout";
import type { CreateFolderDto } from "@/dto/folder-dto";
import { useNavigate } from "react-router";

export function CreateFolderPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateFolderDto) => {
    try {
      const response = await FolderApi.createFolder(values);

      if (response.status !== 201) {
        throw new Error("Folder not created");
      }

      navigate("/folders");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageLayout
      title="Create a New Folder"
      description="Organize your code snippets by creating a folder. Optionally, you can add existing unassigned snippets to this folder for better structure and easier access."
    >
      <CreateFolderForm onSubmit={handleSubmit} />
    </PageLayout>
  );
}
