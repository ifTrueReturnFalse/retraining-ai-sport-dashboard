import { useCallback, useState, useEffect } from "react";

// Key used to store and retrieve token management data from local storage.
const TOKEN_STORAGE = "sportsee-token-management";

// Defines the structure for storing token usage information.
interface TokenStorage {
  /**
   * The number of tokens currently used within the current reset period.
   */
  tokensUsed: number;
  /**
   * The date and time when the `tokensUsed` count will be reset to zero.
   */
  resetDate: Date;
}

/**
 * A custom hook for managing API token usage, including tracking tokens used,
 * resetting the count based on a timer, and persisting data in local storage.
 * @param maximumTokens The maximum number of tokens allowed before `allTokensUsed` returns true.
 * @returns An object containing functions to manage token usage: `resetTokensManager`, `addTokens`, and `allTokensUsed`.
 */
export function useTokenManager(maximumTokens: number) {
  const [tokensManager, setTokensManager] = useState<TokenStorage | null>(
    () => {
      if (typeof window === "undefined") {
        return null;
      }

      try {
        const tokensStorage = window.localStorage.getItem(TOKEN_STORAGE);
        if (tokensStorage !== null) {
          const parsedData: TokenStorage = JSON.parse(tokensStorage);

          // Convert the `resetDate` string from local storage back into a Date object.
          const resetDate = new Date(parsedData.resetDate);

          if (new Date() > resetDate) {
            return { tokensUsed: 0, resetDate: new Date() };
          }
          return { ...parsedData, resetDate };
        } else {
          return { tokensUsed: 0, resetDate: new Date() };
        }
      } catch (error) {
        console.error("Failed to read from local storage", error);
        return null;
      }
    }
  );

  /**
   * Effect hook to synchronize `tokensManager` state with local storage.
   * Whenever `tokensManager` changes, its current state is saved to local storage.
   */
  useEffect(() => {
    if (tokensManager && typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          TOKEN_STORAGE,
          JSON.stringify(tokensManager)
        );
      } catch (error) {
        console.error("Failed to save to local storage", error);
      }
    }
  }, [tokensManager]);

  /**
   * Resets the token usage counter and sets a new `resetDate` to the current time.
   * This effectively starts a new token usage period.
   */
  const resetTokensManager = useCallback(() => {
    setTokensManager({ tokensUsed: 0, resetDate: new Date() });
  }, []);

  /**
   * Adds a specified number of tokens to the `tokensUsed` count and updates the `resetDate`.
   * If the `resetDate` is in the past, it's updated to `resetTimerInHours` from the current time.
   * @param tokensToAdd The number of tokens to add to the current count.
   * @param resetTimerInHours The duration in hours for the new reset period, starting from the current time.
   */
  const addTokens = useCallback(
    (tokensToAdd: number, resetTimerInHours: number) => {
      const now = new Date();
      const nowInMs = now.getTime();
      const durationInMs = resetTimerInHours * 60 * 60 * 1000;
      const dateUntilReset = new Date(nowInMs + durationInMs);

      setTokensManager((prevState) => {
        const currentTokensUsed = prevState?.tokensUsed ?? 0;
        return {
          tokensUsed: currentTokensUsed + tokensToAdd,
          resetDate: dateUntilReset,
        };
      });
    },
    []
  );

  /**
   * Checks if the maximum allowed tokens have been used within the current reset period.
   * If the `resetDate` has passed, it implies a new period has implicitly started, and tokens are not considered "all used".
   * @returns `true` if `tokensUsed` is greater than or equal to `maximumTokens` and the `resetDate` has not passed; otherwise, `false`.
   */
  const allTokensUsed = useCallback(() => {
    if (!tokensManager) return false;

    if (new Date() > tokensManager.resetDate) return false;

    return tokensManager.tokensUsed >= maximumTokens;
  }, [tokensManager, maximumTokens]);

  return { resetTokensManager, addTokens, allTokensUsed };
}
