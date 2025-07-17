import type { CreateFolderDto } from "@/dto/folder-dto";
import { baseClient } from "./api-client";

export class FolderApi {
  static async createFolder(dto: CreateFolderDto) {
    return baseClient.post("/folders", dto);
  }
}
