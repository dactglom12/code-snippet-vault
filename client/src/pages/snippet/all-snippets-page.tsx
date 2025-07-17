import { SnippetApi } from "@/api/snippet-api";
import { PageLayout } from "@/components/layout/page-layout";
import { CodeSnippet } from "@/components/snippet/snippet";
import useSWR from "swr";
import { useSnippetControls } from "@/hooks/use-snippet-controls";
import { DeleteConfirmDialog } from "@/components/dialogs/delete-dialog";
import { AddSnippetButton } from "@/components/snippet/add-snippet-button";
import { SnippetListSkeleton } from "@/components/snippet/snippet-list-skeleton";
import { EmptySnippetState } from "@/components/snippet/empty-snippet-state";

export function AllSnippetsPage() {
  const { data, isLoading, mutate } = useSWR(
    "/snippets",
    SnippetApi.getAllSnippets
  );
  const snippetControls = useSnippetControls();

  const handleDeletion = async () => {
    await snippetControls.deleteSnippet();
    mutate();
  };

  if (isLoading) {
    return <SnippetListSkeleton />;
  }

  if (!data) {
    return null;
  }

  const snippets = data.data.snippets;

  if (snippets.length === 0) {
    return <EmptySnippetState />;
  }

  return (
    <>
      <PageLayout
        title="All Snippets"
        description="Browse and manage all your saved code snippets in one place."
        actions={[
          {
            element: <AddSnippetButton />,
          },
        ]}
      >
        <div className="w-full md:w-3/4">
          {data.data.snippets.map((snippet) => (
            <div key={snippet.id}>
              <CodeSnippet
                id={snippet.id}
                content={snippet.content}
                language={snippet.language}
                title={snippet.title}
                key={snippet.id}
                folder={snippet.folder}
                onDelete={snippetControls.openDeleteDialog}
              />
            </div>
          ))}
        </div>
      </PageLayout>
      <DeleteConfirmDialog
        isOpen={snippetControls.isDeleteDialogOpen}
        onDelete={handleDeletion}
        onClose={snippetControls.closeDeleteDialog}
        title="Delete Snippet?"
        description="This action cannot be undone."
      />
    </>
  );
}
