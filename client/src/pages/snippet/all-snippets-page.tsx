import { SnippetApi } from "@/api/snippet-api";
import { PageLayout } from "@/components/layout/page-layout";
import { CodeSnippet } from "@/components/snippet/snippet";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export function AllSnippetsPage() {
  const { data, isLoading } = useSWR("/snippets", SnippetApi.getAllSnippets);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-24 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
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
              content={snippet.content}
              language={snippet.language}
              title={snippet.title}
              key={snippet.id}
              folder={snippet.folder}
            />
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

function AddSnippetButton() {
  return (
    <Button asChild variant="outline" size="sm" className="gap-2">
      <Link to="/snippets/new">
        <Plus className="w-4 h-4" />
        Add Snippet
      </Link>
    </Button>
  );
}
