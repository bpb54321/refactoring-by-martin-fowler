interface Play {
  name: string;
  type: string;
}

export interface Plays {
  [key: string]: Play;
}

export const plays: Plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};
