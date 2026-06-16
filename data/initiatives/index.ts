import { launchpad } from "./launchpad";
import { founderLab } from "./founder-lab";
import { speakerCircuit } from "./speaker-circuit";
import { communityFund } from "./community-fund";
import { InitiativeDetail } from "./types";

export * from "./types";

export const initiativesDetails: InitiativeDetail[] = [
  launchpad,
  founderLab,
  speakerCircuit,
  communityFund,
];

export const initiatives = initiativesDetails.map((init) => ({
  id: init.id,
  number: init.number,
  title: init.title,
  description: init.description,
}));
