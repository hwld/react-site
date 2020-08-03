export type AppUser = {
  userId: string;
  isAnonymous: boolean;
};

export type AuthState = {
  loading: boolean;
};

export type AuthService = {
  user: AppUser;
  authState: AuthState;
  googleLogin: () => Promise<void>;
  anonymousLogin: () => Promise<void>;
  logout: () => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  deleteAccount: () => void;
};
