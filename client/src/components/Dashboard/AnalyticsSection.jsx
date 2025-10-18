import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function AnalyticsSection({ reports }) {
  return (
    <motion.div className="bg-white rounded-3xl shadow-2xl p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analytics Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={reports}>
          <XAxis dataKey="name" stroke="black" />
          <YAxis stroke="black" />
          <Tooltip />
          <Bar dataKey="confidence" fill="#4F46E5" />
          <Bar dataKey="risk" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
