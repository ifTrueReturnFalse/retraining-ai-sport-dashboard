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

/**
 * Utility type that allows a value to be either of type `T` or `null`.
 */
export type Nullable<T> = T | null;

/**
 * User's personal profile information.
 *
 * - `firstName`: User's first name.
 * - `lastName`: User's last name.
 * - `createdAt`: Account creation date (ISO string).
 * - `age`: User's age.
 * - `weight`: User's weight in kilograms.
 * - `height`: User's height in centimeters.
 * - `profilePicture` (optional): URL to the user's profile picture.
 */
export interface UserProfile {
  firstName: string;
  lastName: string;
  createdAt: string;
  age: number;
  weight: number;
  height: number;
  profilePicture?: string;
}

/**
 * User's aggregated activity statistics.
 *
 * - `totalDistance` (optional): Total distance covered.
 * - `totalSessions` (optional): Total number of sessions.
 * - `totalDuration` (optional): Total duration of all sessions.
 */
export interface UserStatistics {
  totalDistance?: number;
  totalSessions?: number;
  totalDuration?: number;
}

/**
 * Combined user data returned by the backend.
 *
 * - `profile`: User profile or `null` if unavailable.
 * - `statistics`: User statistics or `null` if unavailable.
 */
export interface UserData {
  profile: Nullable<UserProfile>;
  statistics: Nullable<UserStatistics>;
}

/**
 * Shape of the UserContext state in React.
 *
 * - `profile`: User profile or `null`.
 * - `statistics`: User statistics or `null`.
 * - `loading`: Whether user data is currently being fetched.
 * - `refreshUser`: Function to re-fetch profile and statistics.
 */
export interface UserContextType extends UserData {
  loading: boolean;
  refreshUser: () => Promise<void>;
}

/**
 * Heart rate measurements for a single activity.
 *
 * - `min`: Minimum heart rate recorded.
 * - `max`: Maximum heart rate recorded.
 * - `average`: Average heart rate during activity.
 */
export interface HeartRate {
  min: number;
  max: number;
  average: number;
}

/**
 * Represents a single physical activity entry.
 *
 * - `date`: Activity date (ISO string).
 * - `distance`: Distance covered during activity (km).
 * - `duration`: Duration of activity (minutes).
 * - `heartRate`: Heart rate information for the activity.
 * - `caloriesBurned`: Calories burned during the activity.
 */
export interface ActivityType {
  date: string;
  distance: number;
  duration: number;
  heartRate: HeartRate;
  caloriesBurned: number;
}

/**
 * Shape of the ActivitiesContext state in React.
 *
 * - `activities`: List of user activities.
 * - `loading`: Whether activities are currently being fetched.
 * - `refresh` (optional): Function to refresh the activities list.
 */
export interface ActivitiesContextType {
  activities: ActivityType[];
  loading: boolean;
  refresh?: () => void;
}

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};