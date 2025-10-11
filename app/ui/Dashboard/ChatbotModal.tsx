import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ChatModal.module.css";
import { useConversationManager } from "@/app/hooks/useConversationManager";
import { useMistralAPI } from "@/app/hooks/useMistralAPI";
import ChatCloseButton from "./chatBotElements/ChatCloseButton";
import ChatHint from "./chatBotElements/ChatHint";
import ChatInputContainer from "./chatBotElements/ChatInputContainer";
import ChatAssistantMessage from "./chatBotElements/ChatAssistantMessage";
import ChatUserMessage from "./chatBotElements/ChatUserMessage";
import { Message } from "@/app/lib/definitions";
import ChatLoader from "./chatBotElements/ChatLoader";
import { useUser } from "@/app/context/UserContext";
import { useActivities } from "@/app/context/ActivitiesContext";
import { useTokenManager } from "@/app/hooks/useTokenManager";
import ChatAllTokensUsed from "./chatBotElements/ChatAllTokensUsed";
import ChatErrorMessage from "./chatBotElements/ChatErrorMessage";

/**
 * `ChatbotModal` is a React functional component that renders a modal dialog for the AI chatbot.
 * It manages the conversation flow, displays messages, handles user input, and interacts with the Mistral API.
 * @param {Object} props - The properties for the component.
 * @param {RefObject<HTMLDialogElement | null>} props.dialogRef - A ref to the HTML `<dialog>` element for controlling its visibility.
 */
export default function ChatbotModal({
  dialogRef,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>;
}) {
  const { profile } = useUser();
  const necessaryInformations = useMemo(
    // Memoizes user's personal information to be sent to the AI.
    () => ({
      age: profile?.age,
      weight: profile?.weight,
      height: profile?.height,
    }),
    [profile]
  );

  const { activities } = useActivities(); // Retrieves user activities from context.
  const maxActivitiesToSend = 10; // Defines the maximum number of recent activities to send to the AI.
  const activitiesToSend = activities.slice(-maxActivitiesToSend); // Gets the `maxActivitiesToSend` most recent activities.

  const systemPrompt = useMemo(
    // Memoizes the system prompt to prevent unnecessary re-renders.
    // Memoize the system prompt to avoid unnecessary re-renders.
    // This prompt defines the AI's persona, rules, and context.
    () => `Tu es un coach sportif expert et bienveillant, spécialisé dans la course à pied,
   la nutrition sportive et la récupération. Ton nom est John Deuf.

**Mission Principale :**
  Ton objectif est d'analyser les données de performance de l'utilisateur pour fournir des conseils personnalisés,
  encourageants et sécuritaires afin de l'aider à atteindre ses objectifs. 
  Tu dois toujours baser tes réponses sur les données fournies dans le contexte de la conversation.

**Personnalité :**
- **Langage :** Utilise un langage simple et accessible. Évite le jargon technique complexe.
- **Style :**
-  **Direct et Concis :** Va droit au but. Ta mission est de donner le conseil le plus pertinent le plus rapidement possible.
-  **Format :** Réponds en 2 ou 3 phrases maximum, puis utilise une liste à puces si des détails sont nécessaires.
-  **Ton :** Pense "coach qui envoie un SMS" : clair, rapide, efficace, toujours positif, bienveillant et encourageant.
-  **Interactions :** Termine toujours par une question simple et ouverte pour encourager l'utilisateur à continuer la conversation.
-  **Émojis :** Utilise 1 ou 2 émojis maximum par phrase pour dynamiser le message. 💪

**Règles et Garde-fous Stricts :**
1.  **Limite Médicale :** Tu n'es pas un professionnel de santé. 
  Pour toute question liée à une douleur, une blessure ou un problème médical, 
  tu dois fournir des conseils de premier niveau (ex: repos, glace) 
  et **obligatoirement** recommander de consulter un médecin ou un kinésithérapeute, surtout si la douleur persiste. Ne pose jamais de diagnostic.
2.  **Domaine d'Expertise :** Reste strictement dans le domaine du sport : course à pied, 
  planification d'entraînement, nutrition sportive, récupération, et analyse de performance.
3.  **Questions Hors Sujet :** Si l'utilisateur pose une question hors de ton domaine (ex: météo, actualités),
  réponds avec bienveillance que ce n'est pas ton domaine d'expertise et redirige-le vers une question sportive.
  Exemple : "Je suis spécialisé dans le coaching sportif et je ne peux pas te donner la météo.
  En revanche, si tu veux, nous pouvons discuter de comment adapter ton entraînement à différentes conditions climatiques !"
4.  **Personnalisation :** Ne donne jamais de conseils génériques. 
  Fais toujours référence implicitement ou explicitement aux données de l'utilisateur (performances passées, objectifs, etc.)
  pour personnaliser chaque réponse. Si les données ne sont pas disponibles, tu peux le mentionner poliment.
5.  **Concision Maximale :** Ne fais jamais de phrases de remplissage ou d'introductions inutiles. 
Chaque mot doit avoir un but. Si l'utilisateur demande "Que manger avant ma course ?", 
commence ta réponse directement par des suggestions, pas par "C'est une excellente question ! 
Bien se nourrir avant une course est crucial pour...".

**Exemples de Conversations Attendues :**

- **Scénario 1 : Nutrition pré-course**
  - **Utilisateur :** "Que dois-je manger avant ma course de 10km demain ?"
  - **Analyse attendue :** Tu analyseras les données de courses récentes et les habitudes alimentaires si elles sont disponibles.
  - **Réponse type :** Propose un plan de repas structuré (ex: 3h avant, 1h avant) 
    avec des exemples d'aliments (glucides complexes, faciles à digérer) et des conseils d'hydratation,
    tout en rappelant que c'est une suggestion générale à adapter.

- **Scénario 2 : Gestion de blessure**
  - **Utilisateur :** "J'ai mal au genou après ma dernière course, que faire ?"
  - **Analyse attendue :** Tu analyseras l'intensité, la fréquence et la distance des dernières courses.
  - **Réponse type :** Conseille des actions immédiates (repos, glace), 
    suggère des adaptations (réduire l'intensité), et **insiste sur l'importance de consulter un médecin** si la douleur ne s'améliore pas.

- **Scénario 3 : Préparation d'objectif**
  - **Utilisateur :** "Je veux faire un 10km en moins de 45min dans 2 mois."
  - **Analyse attendue :** Tu analyseras le niveau de performance actuel pour évaluer la faisabilité de l'objectif.
  - **Réponse type :** Évalue le réalisme de l'objectif de manière encourageante. 
    Si l'objectif est ambitieux, propose des étapes intermédiaires. 
    Suggère des types d'entraînements spécifiques (fractionné, sorties longues) pour y parvenir.
    
    **Données de courses de l'utilisateur**
    Voici au maximum les 10 dernières courses de l'utilisateur au format JSON.
    Tu devras adapter tes réponses en fonction de ces données
    \`\`\`JSON
    ${JSON.stringify(activitiesToSend)}
    \`\`\`
    
    **Données personnelles de l'utilisateur**
    Voici les données personnelles de l'utilsateur qui peuvent t'aider à affiner tes réponses.
    Gère ces données avec beaucoup de prudence.
    \`\`\`JSON
    ${JSON.stringify(necessaryInformations)}
    \`\`\`
    `,
    [activitiesToSend, necessaryInformations]
  );

  // Initializes conversation manager with the system prompt and a context limit of 6 messages.
  const { allMessages, addUserMessage, addAssistantMessage, getContext } =
    useConversationManager(systemPrompt, 6);
  const { sendMessage, isLoading } = useMistralAPI(); // Hook to interact with the Mistral AI API.
  const bottomRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling to the bottom of the chat conversation.
  const { addTokens, allTokensUsed } = useTokenManager(10000); // Manages AI token usage with a limit of 10000 tokens.
  const [areAllTokensUsed, setAreAllTokensUsed] = useState(false); // State to track if the user has exhausted their AI token limit.
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for displaying any API error messages.

  useEffect(() => {
    // Updates token usage status when the `allTokensUsed` function changes.
    // This ensures the `ChatAllTokensUsed` component's visibility is correctly managed.
    setAreAllTokensUsed(allTokensUsed());
  }, [allTokensUsed]);

  const hoursUntilReset = 6; // Number of hours until token usage resets.

  /**
   * Handles sending a user message to the AI API.
   * It clears any previous error messages, adds the user's message to the conversation,
   * constructs the message payload with context, sends it to the API, and processes the response.
   * @param {string} message - The content of the user's message.
   */
  const sendMessageToAPI = useCallback(
    async (message: string) => {
      setErrorMessage(null); // Clears any existing error message.
      addUserMessage(message); // Adds the user's message to the conversation history.

      const recentMessages: Message[] = [
        ...getContext(), // Retrieves recent messages to provide context to the AI.
        { role: "user", content: message },
      ];
      // Sends the message to the Mistral API.
      const response = await sendMessage(recentMessages);
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        addAssistantMessage(response.message);
        addTokens(response.tokensUsed, hoursUntilReset);
      }
    },
    [addAssistantMessage, addTokens, addUserMessage, getContext, sendMessage]
  );

  /**
   * Retries sending the last message to the AI API in case of an error.
   * It re-sends the current conversation context to the API.
   */
  const retrySendMessage = useCallback(async () => {
    setErrorMessage(null); // Clears any existing error message before retrying.
    const response = await sendMessage(getContext());

    if (response?.error) {
      setErrorMessage(response.error);
    } else {
      addAssistantMessage(response.message);
      addTokens(response.tokensUsed, hoursUntilReset);
    }
  }, [addAssistantMessage, addTokens, getContext, sendMessage]);

  useEffect(() => {
    // Scrolls to the bottom of the conversation whenever `allMessages` or `isLoading` state changes.
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, isLoading]);

  return (
    <dialog ref={dialogRef} className={styles.dialog}>
      <div className={styles.container}>
        <ChatCloseButton dialogRef={dialogRef} />
        <div className={styles.conversation}>
          {" "}
          {/* Container for displaying chat messages. */}
          {allMessages.length === 0 && <ChatHint />}
          {allMessages.length > 0 &&
            allMessages.map((message, index) =>
              message.role === "assistant" ? (
                <ChatAssistantMessage key={index} content={message.content} />
              ) : (
                <ChatUserMessage key={index} content={message.content} />
              )
            )}
          {isLoading && <ChatLoader />}{" "}
          {/* Displays a loader when the AI is processing. */}
          <div ref={bottomRef} />{" "}
          {/* Invisible div used for auto-scrolling to the bottom. */}
        </div>
        {errorMessage !== null && ( // Conditionally renders an error message if `errorMessage` is not null.
          <ChatErrorMessage
            errorMessage={errorMessage}
            retryFunction={() => retrySendMessage()}
          />
        )}
        {areAllTokensUsed && <ChatAllTokensUsed />}{" "}
        {/* Conditionally renders a message when all tokens are used. */}
        {/* Input container for user messages and message presets. */}
        <ChatInputContainer
          sendMessageToAPI={sendMessageToAPI}
          isLoading={isLoading}
          allTokensUsed={allTokensUsed()}
        />
      </div>
    </dialog>
  );
}
