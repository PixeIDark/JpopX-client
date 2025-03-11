import { StaticImageData } from "next/image";

export interface MeResponse {
  id: number;
  name: string;
  email: string;
  profile_image_url: string;
  created_at: string;
  updated_at: string;
}

export type AllResponse = MeResponse[];

export interface MeModifyRequest {
  name?: string;
  password?: string;
  profile_image_url?: StaticImageData | string | null;
}

export interface MeModifyResponse {
  id: number;
  name: string;
  email: string;
  profile_image_url: StaticImageData | string | null;
  created_at: string;
  updated_at: string;
}
