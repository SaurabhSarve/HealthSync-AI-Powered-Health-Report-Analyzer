import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";

export default function AnalysisResult({ data }) {
  // Fallbacks for AI data
  const {
    summary = "No analysis result available.",
    confidence = 60,
    risk = 40,
    severity = "Moderate",
    recommendation = "Monitor health and follow doctor’s advice.",
  } = data;

  const chartData = [
    { name: "Confidence", value: confidence },
    { name: "Risk", value: risk },
  ];

  return (
    <motion.div
      className="text-center mt-6 p-6 border rounded-2xl shadow-md bg-white max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        AI Analysis Summary
      </h2>
      <p className="text-gray-600 mb-6">{summary}</p>

      {/* Chart */}
      <PieChart width={300} height={300} className="mx-auto">
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="value"
          animationBegin={0}
          animationDuration={1200}
          isAnimationActive={true}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`url(#grad${index})`}
              stroke="none"
            />
          ))}
        </Pie>

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="grad0" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
            <stop offset="100%" stopColor="#818CF8" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F87171" stopOpacity={1} />
            <stop offset="100%" stopColor="#FCA5A5" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>

      {/* Additional Insights */}
      <div className="mt-6 text-left space-y-2">
        <p>
          <strong>🩺 Severity:</strong> {severity}
        </p>
        <p>
          <strong>🎯 Confidence Score:</strong> {confidence}%
        </p>
        <p>
          <strong>💡 Recommendation:</strong> {recommendation}
        </p>
      </div>
    </motion.div>
  );
}
