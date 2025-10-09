import { useCallback, useState, useEffect } from "react";

const TOKEN_STORAGE = "sportsee-token-management";

interface TokenStorage {
  tokensUsed: number;
  resetDate: Date;
}

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

  const resetTokensManager = useCallback(() => {
    setTokensManager({ tokensUsed: 0, resetDate: new Date() });
  }, []);

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

  const allTokensUsed = useCallback(() => {
    if (!tokensManager) return false;

    if (new Date() > tokensManager.resetDate) return false;

    return tokensManager.tokensUsed >= maximumTokens;
  }, [tokensManager, maximumTokens]);

  return { resetTokensManager, addTokens, allTokensUsed };
}
