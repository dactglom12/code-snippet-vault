import type { CreateSnippetDto } from "@/dto/snippet-dto";
import { baseClient } from "./api-client";
import type { AxiosResponse } from "axios";
import type { SnippetEntity } from "@/entities/snippet-entity";

export class SnippetApi {
  static async createSnippet(dto: CreateSnippetDto) {
    return baseClient.post<AxiosResponse<SnippetEntity>>("/snippets/", dto);
  }
}
