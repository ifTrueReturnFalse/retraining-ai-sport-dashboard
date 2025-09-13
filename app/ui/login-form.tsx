import TextInput from "@/app/ui/TextInput/TextInput";
import { Button } from "@/app/ui/Buttons/Buttons";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div  className="bg-white flex flex-col h-[620px] w-[400px] px-10 py-10 rounded-[20] gap-7">
      <div className="font-semibold text-[28px] text-[#0b23f4]">
        Transformez
        <br />
        vos stats en résultats
      </div>
      <form className="flex flex-col">
        <div className="text-[22px] font-medium mb-[15]">Se connecter</div>
        <TextInput type="text" id="email" labelText="Adresse email" className="mb-[15]" />
        <TextInput type="password" id="password" labelText="Mot de passe" className="mb-[40]" />
        <Button buttonText="Se connecter" isSubmitButton={true} className="mb-[15]" />
      </form>
      <Link href="/">Mot de passe oublié</Link>
    </div>
  );
}
