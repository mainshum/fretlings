import { first } from "fp-ts/lib/Semigroup";

export default function random(getRandom: () => number = Math.random) {
  function getRandomAr<T>(ar: T[]): T {
    const int = 1 / ar.length;
    const r = getRandom();
    let intInd = 0;
    while (true) {
      const [a, b] = [intInd * int, (intInd + 1) * int];
      if (r >= a && r <= b) return ar[intInd];

      intInd += 1;
    }
  }
  function* genPairsNoReps<T>(pairs: T[][]): any {
    const indMap: Record<string, Record<string, T>> = pairs.reduce(
      (acc, first, firstInd) => {
        return {
          ...acc,
          ...first.map((snd, sndInd) => ({
            [sndInd.toString()]: [first, snd],
          })),
        };
      },
      {}
    );

    while (true) {
      if (Object.keys(indMap).length === 0) return "Done";

      const rFirst = getRandomAr(Object.keys(indMap));
      const rSecond = getRandomAr(Object.keys(rFirst));

      yield indMap[rFirst][rSecond];
      delete indMap[rFirst][rSecond];
      if (Object.keys(indMap[rFirst]).length === 0) delete indMap[rFirst];
    }
  }

  return {
    genPairsNoReps,
  };
}
