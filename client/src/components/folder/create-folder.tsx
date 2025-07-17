import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSWR from "swr";
import { SnippetApi } from "@/api/snippet-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "../ui/form";
import { Check } from "lucide-react";
import type { CreateFolderDto } from "@/dto/folder-dto";

type CreateFolderFormProps = {
  onSubmit: (values: CreateFolderDto) => void;
};

export function CreateFolderForm({ onSubmit }: CreateFolderFormProps) {
  const [snippetIdsSet, setSnippetIdsSet] = useState<Set<number>>(new Set());

  const { data } = useSWR("/snippets?folderless=true", () =>
    SnippetApi.getAllSnippets({ folderless: true })
  );
  const form = useForm({
    defaultValues: {
      name: "",
      snippetId: "",
    },
  });

  const onSelectChange = (snippetId: string) => {
    const numberized = parseInt(snippetId);
    setSnippetIdsSet((set) => {
      const newSet = new Set(set);
      if (newSet.has(numberized)) {
        newSet.delete(numberized);
      } else {
        newSet.add(numberized);
      }

      return newSet;
    });
  };

  if (!data) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit({ name: values.name, snippetIds: Array.from(snippetIdsSet) })
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. React Hooks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {data.data.snippets.length > 0 && (
            <FormField
              control={form.control}
              name="snippetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign a Snippet (optional)</FormLabel>
                  <FormControl>
                    <Select onValueChange={onSelectChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a snippet" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {data.data.snippets.map((snippet) => (
                          <SelectItem
                            key={snippet.id}
                            value={String(snippet.id)}
                          >
                            {snippet.title}
                            {snippetIdsSet.has(snippet.id) && <Check />}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    You can leave this blank to create an empty folder.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button
          type="submit"
          disabled={form.watch("name").length === 0}
          className="mt-4"
        >
          Create Folder
        </Button>
      </form>
    </Form>
  );
}
