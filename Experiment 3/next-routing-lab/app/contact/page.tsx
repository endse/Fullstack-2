export default function Contact(): JSX.Element {
  return (
    <div style={{ marginLeft: 260 }}>
      <h1>Settings</h1>

      <div style={formCard}>
        <label>
          Display Name
          <input type="text" placeholder="Student" style={input} />
        </label>

        <label>
          Theme
          <select style={input}>
            <option>Dark</option>
            <option>Light</option>
          </select>
        </label>

        <button style={btn}>Save Changes</button>
      </div>
    </div>
  );
}

const formCard: React.CSSProperties = {
  background: "#020617",
  padding: 25,
  borderRadius: 12,
  border: "1px solid #1e293b",
  maxWidth: 400,
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 10,
  marginTop: 6,
  marginBottom: 18,
  borderRadius: 6,
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
};

const btn: React.CSSProperties = {
  background: "#38bdf8",
  border: "none",
  padding: "10px 15px",
  borderRadius: 6,
  cursor: "pointer",
};
