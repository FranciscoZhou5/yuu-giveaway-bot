import * as GiveawaySetup from "./giveaway_setup";

export default function handleModalSubmitInteraction(customId: string) {
  const interactionHandler = {
    [GiveawaySetup.id]: GiveawaySetup.handler,
  };

  const keys = Object.keys(interactionHandler);

  if (!keys.includes(customId)) {
    return null;
  }

  return interactionHandler[customId as keyof typeof interactionHandler];
}
