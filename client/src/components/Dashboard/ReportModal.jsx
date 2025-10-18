import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ReportModal({ selectedReport, setSelectedReport }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setSelectedReport(null)}
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{selectedReport.name}</h3>
        <p className="mb-4 text-gray-600">{selectedReport.summary}</p>
        <PieChart width={250} height={250}>
          <Pie
            data={[
              { name: "Confidence", value: selectedReport.confidence },
              { name: "Risk", value: selectedReport.risk },
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
          >
            <Cell fill="#4F46E5" />
            <Cell fill="#EF4444" />
          </Pie>
          <Tooltip />
        </PieChart>
      </motion.div>
    </motion.div>
  );
}
