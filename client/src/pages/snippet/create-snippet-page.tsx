import { SnippetForm } from "@/components/snippet/snippet-form";
import type { CreateSnippetDto } from "@/dto/snippet-dto";

export function CreateSnippetPage() {
  const handleSubmit = (values: CreateSnippetDto) => {
    console.log("values");
    console.log(values);
  };

  return (
    <>
      <SnippetForm onSubmit={handleSubmit} />
    </>
  );
}
