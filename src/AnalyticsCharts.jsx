import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ChartTitle = ({ children }) => (
  <h2 style={{ fontSize: 16.5, fontWeight: 600, letterSpacing: "-.01em", margin: "0 0 14px" }}>{children}</h2>
);

export default function AnalyticsCharts({ taskData, modelUse }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }} className="dash-grid">
      <div className="card" style={{ padding: 18 }}>
        <ChartTitle>Task completion</ChartTitle>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={taskData} margin={{ left: -22, right: 6, top: 6 }}>
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7C5CFF" stopOpacity={0.5} /><stop offset="100%" stopColor="#7C5CFF" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
            <XAxis dataKey="d" stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: 10, fontSize: 12 }} />
            <Area type="monotone" dataKey="done" stroke="#7C5CFF" strokeWidth={2} fill="url(#g1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="card" style={{ padding: 18 }}>
        <ChartTitle>Model utilization</ChartTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={modelUse} margin={{ left: -22, right: 6, top: 6 }}>
            <CartesianGrid stroke="rgba(255,255,255,.05)" vertical={false} />
            <XAxis dataKey="m" stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="var(--tx3)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: 10, fontSize: 12 }} cursor={{ fill: "rgba(255,255,255,.03)" }} />
            <Bar dataKey="v" fill="#2FD4E6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
