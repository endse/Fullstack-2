export default function Home(): JSX.Element {
  return (
    <div style={pageWrap}>
      <h1>Dashboard Overview</h1>

      <div style={grid}>
        <Card title="Users" value="1,245" />
        <Card title="Revenue" value="$32,890" />
        <Card title="Traffic" value="82%" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={card}>
      <h3>{title}</h3>
      <p style={metric}>{value}</p>
    </div>
  );
}

const pageWrap: React.CSSProperties = {
  marginLeft: 260,
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 25,
  marginTop: 25,
};

const card: React.CSSProperties = {
  background: "#020617",
  padding: 25,
  borderRadius: 12,
  border: "1px solid #1e293b",
};

const metric: React.CSSProperties = {
  fontSize: 28,
  fontWeight: "bold",
  marginTop: 10,
};