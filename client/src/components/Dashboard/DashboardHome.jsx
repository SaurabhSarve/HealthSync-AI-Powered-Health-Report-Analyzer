import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function DashboardHome({ reports, stats, setSelectedReport }) {
  return (
    <motion.div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className={`bg-gradient-to-r ${s.color} text-white rounded-3xl p-6 shadow-xl`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-bold">{s.value}</h3>
            <p>{s.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Reports Overview</h2>
        <div className="flex flex-wrap gap-6">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              className="bg-indigo-50 p-4 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedReport(report)}
            >
              <h3 className="font-bold text-lg">{report.name}</h3>
              <p className="text-gray-600 mb-2">Severity: {report.severity}</p>
              <PieChart width={120} height={120}>
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
        </div>
      </div>
    </motion.div>
  );
}
