export interface GeneratedImage {
  id: number;
  generation_prompt: string;
  generation_timestamp: string;
  imgbb_display_url: string;
  imgbb_title: string;
  imgbb_width: string;
  imgbb_height: string;
  imgbb_size: string;
}

export interface ImageModalProps {
  image: GeneratedImage | null;
  onClose: () => void;
  onDelete?: (id: number) => Promise<void>;
  isAdmin?: boolean;
}

export interface ImageCardProps {
  image: GeneratedImage;
  onClick: () => void;
}

export interface User {
  id: number;
  username: string;
  is_admin: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}