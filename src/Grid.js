export default function Grid({ grid, placeBlock }) {
  return (
    <div className="grid">
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div
            key={`${r}-${c}`}
            className={`cell ${cell ? "filled" : ""}`}
            onDragOver={e => e.preventDefault()}
            onDrop={() => placeBlock(r, c)}
          />
        ))
      )}
    </div>
  );
}
