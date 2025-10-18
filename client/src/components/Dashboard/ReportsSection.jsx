import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ReportsSection({ reports, setSelectedReport }) {
  return (
    <motion.div className="grid md:grid-cols-3 gap-6">
      {reports.map((report) => (
        <motion.div
          key={report.id}
          className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.03 }}
          onClick={() => setSelectedReport(report)}
        >
          <h3 className="font-bold text-lg">{report.name}</h3>
          <p className="text-gray-600 mb-2">Severity: {report.severity}</p>
          <PieChart width={150} height={150}>
            <Pie
              data={[
                { name: "Confidence", value: report.confidence },
                { name: "Risk", value: report.risk },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={50}
              dataKey="value"
            >
              <Cell fill="#4F46E5" />
              <Cell fill="#EF4444" />
            </Pie>
            <Tooltip />
          </PieChart>
        </motion.div>
      ))}
    </motion.div>
  );
}
