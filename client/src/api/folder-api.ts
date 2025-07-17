import type { CreateFolderDto } from "@/dto/folder-dto";
import { baseClient } from "./api-client";
import type { FolderEntity } from "@/entities/folder-entity";

export class FolderApi {
  static async createFolder(dto: CreateFolderDto) {
    return baseClient.post("/folders", dto);
  }

  static async getFolders() {
    return baseClient.get<{ folders: FolderEntity[] }>("/folders");
  }

  static async deleteFolder(id: number) {
    return baseClient.delete(`/folders/${id}`);
  }
}
