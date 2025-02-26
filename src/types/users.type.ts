interface MeResponse {
  id: number;
  name: string;
  email: string;
  profile_image_url: string;
  created_at: string;
  updated_at: string;
}

type AllResponse = MeResponse[];
