export enum PlayType {
  Tragedy = "tragedy",
  Comedy = "comedy",
}

interface Play {
  name: string;
  type: PlayType;
}

export interface Plays {
  [key: string]: Play;
}

export const plays: Plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};
