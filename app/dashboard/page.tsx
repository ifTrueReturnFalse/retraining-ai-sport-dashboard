import { Button } from "@/app/ui/Buttons/Buttons";

export default function Page() {
  return (
    <div>
      <div>
        <p>
          Posez vos questions sur votre programme, vos performances ou vos
          objectifs.
        </p>
        <Button isSubmitButton={false} buttonText="Lancer une conversation" />
      </div>
    </div>
  );
}
