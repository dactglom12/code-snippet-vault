import { FolderApi } from "@/api/folder-api";
import { CreateFolderForm } from "@/components/folder/create-folder";
import { PageLayout } from "@/components/layout/page-layout";
import type { CreateFolderDto } from "@/dto/folder-dto";

export function CreateFolderPage() {
  const handleSubmit = async (values: CreateFolderDto) => {
    try {
      const response = await FolderApi.createFolder(values);

      console.log("response");
      console.log(response);
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
