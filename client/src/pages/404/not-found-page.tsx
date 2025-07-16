import { CodeSnippet } from "@/components/snippet/snippet";
import { Language } from "@/entities/language-entity";

export function NotFoundPage() {
  return (
    <div className="flex justify-center items-center">
      <div className="py-24 w-1/2">
        <CodeSnippet
          language={Language.JAVASCRIPT}
          title="404"
          content={`
function notFoundPage() {
  if(someWeirdPagePath) {
      throw new NotFoundError("Page not found");
  } else {
      throw new WorkInProgressError("Work on page is in progress");
  }
}
            `}
          hideControls
        />
      </div>
    </div>
  );
}
