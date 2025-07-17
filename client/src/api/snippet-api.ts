import type {
  CreateSnippetDto,
  GetAllSnippetsQueryParams,
} from "@/dto/snippet-dto";
import { baseClient } from "./api-client";
import type { AxiosResponse } from "axios";
import type { SnippetEntity } from "@/entities/snippet-entity";

export class SnippetApi {
  static async createSnippet(dto: CreateSnippetDto) {
    return baseClient.post<AxiosResponse<SnippetEntity>>("/snippets/", dto);
  }

  static async getAllSnippets(params?: GetAllSnippetsQueryParams) {
    const queryParams = new URLSearchParams();

    if (params) {
      if (params.folderless) {
        queryParams.set("folderless", String(params.folderless));
      }
    }

    let path = "/snippets/";

    if (queryParams.size > 0) {
      path = path.concat(`?${queryParams.toString()}`);
    }

    return baseClient.get<{ snippets: SnippetEntity[] }>(path);
  }
}
