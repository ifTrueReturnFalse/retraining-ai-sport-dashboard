import { UserData } from "./definitions";
import { LoginResponse } from "@/app/lib/definitions";

/**
 * Sends a login request to the backend API and returns the response.
 *
 * @param {string} username - User identifier (email or username).
 * @param {string} password - User password.
 * @returns {Promise<LoginResponse | undefined>} - Returns login data if successful, undefined otherwise.
 */
export async function login(
  username: string,
  password: string
): Promise<LoginResponse | undefined> {
  try {
    // Get the backend API URL from environment variables
    const api_url = process.env.API_URL;
    // Prepare request body
    const requestBody = { username, password };

    // Send POST request to backend login endpoint
    const response = await fetch(`${api_url}/login`, {
      body: JSON.stringify(requestBody),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // If response is not OK, return undefined
    if (!response.ok) return undefined;

    // Parse and return JSON data from backend
    const data = await response.json();

    return data;
  } catch {
    return undefined;
  }
}

export async function fetchUser(accesToken: string) {
  try {
    const api_url = process.env.API_URL;
    const result = await fetch(`${api_url}/user-info`, {
      headers: { Authorization: `Bearer ${accesToken}` },
      method: "GET",
    });
    console.log(result);
    if (!result.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data: UserData = await result.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
