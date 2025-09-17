"use client";

import { useState } from "react";
import TextInput from "@/app/ui/TextInput/TextInput";
import { Button } from "@/app/ui/Buttons/Buttons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Identifiants incorrects");
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      setError("Problème rencontré lors de la connexion");
    } finally {
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
        />
        <TextInput
          type="password"
          id="password"
          labelText="Mot de passe"
          className="mb-[40]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          buttonText={isLoading ? "Connexion..." : "Se connecter"}
          isSubmitButton={true}
          className="mb-[15]"
          disabled={isLoading}
        />
      </form>
      {error && <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded">{error}</div>}
      <p>Mot de passe oublié</p>
    </div>
  );
}
