export interface RandomService {
  genNoReps: <T>(xs: T[]) => Generator<T, string, boolean>;
}

export default function random(
  getRandom: () => number = Math.random
): RandomService {
  function getRandomArInd<T>(ar: T[]): number {
    return Math.floor(ar.length * getRandom());
  }
  function* genNoReps<T>(vals: T[]): Generator<T, string, boolean> {
    const copy = vals.slice();
    while (true) {
      if (copy.length === 0) return "Done";
      const randomInd = getRandomArInd(copy);
      yield copy.splice(randomInd, 1)[0];
    }
  }

  return {
    genNoReps,
  };
}
