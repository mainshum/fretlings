import React from "react";
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
  (["E", "A", "D", "G", "B", "E"] as const)[strInd];

const generateNodes = (n: number, firstNote: Note): Note[] => {
  let noteInd = NOTES.findIndex((n) => n === firstNote);
  const retval: Note[] = [];

  while (retval.length < n) {
    retval.push(NOTES[noteInd % NOTES.length]);
    noteInd += 1;
  }

  return retval;
};

function Grid({ frets }: { frets: number }) {
  const [fretboard] = React.useState<Note[][]>(() => {
    const strings = Array(STRINGS).fill(null);
    return strings.map((_, stringInd: number) =>
      generateNodes(frets, stringIndToFirstNote(stringInd))
    );
  });

  return (
    <div style={{ display: "grid", ...getFretSizes(frets) }}>
      {fretboard.map((s, sNo) =>
        s.map((note, noteNo) => (
          <div style={{ border: `1px solid black` }} key={`${sNo}_${noteNo}`}>
            {note}
          </div>
        ))
      )}
    </div>
  );
}

export default Grid;
