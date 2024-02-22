import * as GiveawayParticipate from "./giveaway_participate";
import * as GiveawayParticipants from "./giveaway_participants";

export default function handleButtonInteraction(customId: string) {
  const interactionHandler = {
    [GiveawayParticipate.id]: GiveawayParticipate.handler,
    [GiveawayParticipants.id]: GiveawayParticipants.handler,
  };

  const keys = Object.keys(interactionHandler);

  if (!keys.includes(customId)) {
    return null;
  }

  return interactionHandler[customId as keyof typeof interactionHandler];
}
