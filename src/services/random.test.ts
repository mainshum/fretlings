import random from "./random";
const randomService = random();

it("values do not repeat and are exhausted", () => {
  const len = Math.floor(Math.random() * 1000);
  const vals = Array(len).fill(null).map((_, i) => i);
  let iters = 0;
  const ran = randomService.genNoReps(vals);
  const results: Set<number> = new Set();
  while (true) {
    const next = ran.next();
    if (next.done) 
      break;
    results.add(next.value);
    iters += 1;
  }

  expect(iters).toBe(len)
  expect(results.size).toBe(len)
});
