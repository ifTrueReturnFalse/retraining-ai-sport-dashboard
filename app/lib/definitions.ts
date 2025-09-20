/**
 * Types and interface extensions for authentication in the app.
 */

/**
 * Response returned by the backend login endpoint.
 *
 * - `token` (optional): JWT or access token returned by backend.
 * - `userId` (optional): Unique identifier for the authenticated user.
 * - `message` (optional): Optional message from the backend (e.g., error or info).
 */
export interface LoginResponse {
  token?: string;
  userId?: string;
  message?: string;
}

/**
 * Extend NextAuth Session and User types to include accessToken.
 * This allows TypeScript to recognize the `accessToken` property
 * when using `useSession()` or accessing the user object.
 */
declare module "next-auth" {
  interface Session {
    /** Access token for API requests */
    accessToken?: string;
  }

  interface User {
    /** Access token available during sign-in */
    accessToken?: string;
  }
}

/**
 * Extend NextAuth JWT type to include accessToken.
 * This ensures the JWT callback and session callback
 * can propagate the token without TypeScript errors.
 */
declare module "next-auth/jwt" {
  interface JWT {
    /** Access token stored in the JWT */
    accessToken?: string;
  }
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  createdAt: string;
  age: number;
  weight: number;
  height: number;
  profilePicture?: string;
}

export interface UserStatistics {
  totalDistance: number;
  totalSessions: number;
  totalDuration: number;
}

export interface UserData {
  profile: UserProfile | null;
  statistics: UserStatistics | null;
}

export interface UserContextType {
  profile: UserProfile | null;
  statistics: UserStatistics | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}
