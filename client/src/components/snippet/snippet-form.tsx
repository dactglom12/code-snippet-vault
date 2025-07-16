import { useForm, Controller } from "react-hook-form";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { CreateSnippetDto } from "@/dto/snippet-dto";
import { Language } from "@/entities/language-entity";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { LANGUAGE_OPTIONS } from "@/constants/snippet-constants";

interface SnippetFormProps {
  onSubmit: (values: CreateSnippetDto) => void;
  initialValues?: Partial<CreateSnippetDto>;
}

export function SnippetForm({
  onSubmit,
  initialValues = {},
}: SnippetFormProps) {
  const { control, handleSubmit, watch } = useForm<CreateSnippetDto>({
    defaultValues: {
      title: "",
      language: Language.JAVASCRIPT,
      content: "",
      ...initialValues,
    },
  });

  const selectedLanguage = LANGUAGE_OPTIONS.find(
    (lang) => lang.value === watch("language")
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex justify-between w-full">
        <div className="w-1/3">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div className="space-y-1.5">
                <Label htmlFor="language">Title</Label>
                <Input placeholder="Title..." {...field} />
              </div>
            )}
          />
        </div>

        <Controller
          control={control}
          name="language"
          render={({ field }) => (
            <div className="space-y-1.5">
              <Label htmlFor="language">Language</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      <div>
        <Label>Code</Label>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <CodeMirror
              className="mt-2"
              value={field.value}
              height="200px"
              theme={oneDark}
              extensions={selectedLanguage ? [selectedLanguage.extension] : []}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>

      <Button type="submit">Save Snippet</Button>
    </form>
  );
}
