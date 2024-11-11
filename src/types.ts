export interface User {
  id: number;
  username: string;
  email: string;
  profile_picture: string;
  is_admin: boolean;
}

export interface AuthContextType {
  user: User | null;
  loginWithGoogle: (credentialResponse: CredentialResponse) => Promise<void>;
  logout: () => void;
}

export interface GeneratedImage {
  id: number;
  generation_prompt: string;
  generation_timestamp: string;
  imgbb_display_url: string;
  imgbb_title: string;
  imgbb_width: number;
  imgbb_height: number;
  imgbb_size: number;
}

export interface ImageCardProps {
  image: GeneratedImage;
  onClick: () => void;
}

export interface ImageModalProps {
  image: GeneratedImage;
  onClose: () => void;
  onDelete?: (id: number) => Promise<void>;
  isAdmin: boolean;
}

// Add this interface for Google credential response
export interface CredentialResponse {
  credential: string;
  select_by: string;
}