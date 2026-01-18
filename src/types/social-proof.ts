/**
 * Tipos TypeScript para Social Proofs (Provas Sociais)
 */

export interface SocialProofItem {
  id: string;
  name?: string;
  text: string;
  rating: number;
  image: string;
  date?: string;
}

export interface CreateSocialProofData {
  file?: File;
  text: string;
  name?: string;
  rating?: number;
}

export interface UpdateSocialProofData {
  file?: File;
  text?: string;
  name?: string;
  rating?: number;
}

export interface SocialProofResponse {
  message: string;
  data: SocialProofItem;
}

export interface DeleteSocialProofResponse {
  message: string;
  removed: boolean;
}
