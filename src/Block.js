export default function Block({ block }) {
  return (
    <div className="block-preview">
      <h3>Next Block</h3>
      <div draggable className="draggable">
        {block.map((row, r) => (
          <div key={r} className="block-row">
            {row.map((cell, c) => (
              <div
                key={c}
                className={`block-cell ${cell ? "filled" : ""}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
