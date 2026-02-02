export default function About(): JSX.Element {
  return (
    <div style={{ marginLeft: 260 }}>
      <h1>Analytics</h1>

      <section style={panel}>
        <h3>User Activity</h3>
        <p>Engagement increased by 24% this month.</p>
      </section>

      <section style={panel}>
        <h3>Conversion Rate</h3>
        <p>Current conversion rate is 6.4%.</p>
      </section>
    </div>
  );
}

const panel: React.CSSProperties = {
  marginTop: 25,
  background: "#020617",
  padding: 25,
  borderRadius: 12,
  border: "1px solid #1e293b",
};
