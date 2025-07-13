import type { SigninDto, SignupDto } from "@/dto/auth-dto";
import { baseClient } from "./api-client";
import type { UserEntity } from "@/entities/user-entity";

export class AuthApi {
  static async signup(dto: SignupDto) {
    return baseClient.post("/auth/signup", dto);
  }

  static async signin(dto: SigninDto) {
    return baseClient.post("/auth/signin", dto);
  }

  static async me() {
    return baseClient.get<unknown, UserEntity>("/auth/me");
  }
}
