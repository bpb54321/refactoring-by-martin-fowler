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
  hamlet: { name: "Hamlet", type: PlayType.Tragedy },
  "as-like": { name: "As You Like It", type: PlayType.Comedy },
  othello: { name: "Othello", type: PlayType.Tragedy },
};
