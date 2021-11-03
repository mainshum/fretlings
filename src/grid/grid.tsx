import * as AR from "fp-ts/lib/Array";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import React from "react";
import { RandomService } from "../services/random";

//import styles from "./grid.module.css";

const STRINGS = 6;

const NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;

type Note = typeof NOTES[number];

const getFretSizes = (frets: number) => ({
  gridTemplateRows: `repeat(6, 20px)`,
  gridTemplateColumns: `repeat(${frets}, 30px)`,
});

const stringIndToFirstNote = (strInd: number): Note =>
  (["E", "B", "G", "D", "A", "E"] as const)[strInd];

const generateNotes = (n: number, firstNote: Note): Note[] => {
  let noteInd = NOTES.findIndex((n) => n === firstNote);
  const retval: Note[] = [];

  while (retval.length < n) {
    retval.push(NOTES[noteInd % NOTES.length]);
    noteInd += 1;
  }

  return retval;
};

function useGridBuilder() {
  const gridMap = React.useRef();
  const builder = React.useCallback((node: HTMLDivElement | null) => {}, []);

  return builder;
}

interface GridMeta {
  gridWidth: string;
  gridHeight: string;
}

function Grid({
  frets,
  randomService,
}: {
  frets: number;
  randomService: RandomService;
}) {
  const gridContRef = React.useRef<HTMLDivElement>(null);
  const [gridMeta, setGridMeta] = React.useState<O.Option<GridMeta>>(O.none);

  const fretboard = React.useMemo(
    () =>
      pipe(
        AR.makeBy(STRINGS, (str) =>
          generateNotes(frets, stringIndToFirstNote(str))
        )
      ),
    [frets]
  );

  const fretBuiltCb = useGridBuilder();

  React.useLayoutEffect(() => {
    if (gridContRef.current) {
      // grid should have width of 90% of viewport
      // ideal ratio for fret is 3/2
      const { clientWidth } = gridContRef.current;
      const gridWidth = 0.9 * clientWidth;
      const fretWidth = gridWidth / frets;
      const fretHeight = (2 * fretWidth) / 4;
      const gridHeight = fretHeight * STRINGS;
      setGridMeta(
        O.some({
          gridWidth: `${gridWidth}px`,
          gridHeight: `${gridHeight}px`,
        })
      );
    }
  }, [gridContRef, frets]);

  return (
    <div
      ref={gridContRef}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {pipe(
        gridMeta,
        O.fold(
          () => null,
          ({ gridWidth, gridHeight }) => (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${frets}, 1fr)`,
                gridTemplateRows: `repeat${STRINGS}, 1fr)`,
                width: gridWidth,
                height: gridHeight,
              }}
            >
              {fretboard.map((str, sNo) =>
                str.map((note, noteNo) => (
                  <div
                    ref={fretBuiltCb}
                    style={{ border: `1px solid black` }}
                    key={`${sNo}_${noteNo}`}
                  >
                    {note}
                  </div>
                ))
              )}
            </div>
          )
        )
      )}
    </div>
  );
}

export default Grid;
