"use client";

import { useState } from "react";
import TextInput from "@/app/ui/TextInput/TextInput";
import { Button } from "@/app/ui/Buttons/Buttons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { checkCredentials } from "@/app/lib/utils";

/**
 * LoginForm component
 *
 * Handles user authentication flow:
 *  - Validates that fields are not empty
 *  - Calls NextAuth with credentials
 *  - Displays potential errors
 *  - Redirects to the dashboard upon success
 */
export default function LoginForm() {
  // Store input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Loading state for the login process
  const [isLoading, setIsLoading] = useState(false);
  // Error message state
  const [error, setError] = useState("");
  // Next.js router for client-side redirects
  const router = useRouter();

  /**
   * Handles form submission
   * @param e - form submit event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Activates loading state
    setError(""); // Clear previous errors

    try {
      // Basic frontend validation
      const checkResult = checkCredentials(email, password);
      if (!checkResult.success) {
        // Stop and display error if validation fails
        setError(checkResult.message);
      } else {
        // Attempt to sign in using NextAuth "credentials" provider
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false, // We handle the redirect manually
        });

        // Handle possible authentication errors
        if (result?.error) {
          setError("Identifiants incorrects");
        } else {
          // Success → navigate to dashboard
          router.push("/dashboard");
        }
      }
    } catch {
      // Unexpected error (e.g., server issues)
      setError("Problème rencontré lors de la connexion");
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col h-[620px] w-[400px] px-10 py-10 rounded-[20] gap-7">
      <div className="font-semibold text-[28px] text-[#0b23f4]">
        Transformez
        <br />
        vos stats en résultats
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="text-[22px] font-medium mb-[15]">Se connecter</div>

        <TextInput
          type="text"
          id="email"
          labelText="Adresse email"
          className="mb-[15]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <TextInput
          type="password"
          id="password"
          labelText="Mot de passe"
          className="mb-[40]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <Button
          buttonText={isLoading ? "Connexion..." : "Se connecter"}
          isSubmitButton={true}
          className="mb-[15]"
          disabled={isLoading}
        />
      </form>

      {error && (
        <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}

      <p>Mot de passe oublié</p>
    </div>
  );
}
