import { SnippetApi } from "@/api/snippet-api";
import { SnippetForm } from "@/components/snippet/snippet-form";
import type { CreateSnippetDto } from "@/dto/snippet-dto";

export function CreateSnippetPage() {
  const handleSubmit = async (values: CreateSnippetDto) => {
    try {
      const response = await SnippetApi.createSnippet({
        content: values.content,
        language: values.language,
        title: values.title,
        // TODO: add folder and tags functionality
        folderId: undefined,
        tags: undefined,
      });

      console.log("create snippet response");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SnippetForm onSubmit={handleSubmit} />
    </>
  );
}
