import UploadForm from "../UploadForm";
import { motion } from "framer-motion";

export default function UploadSection({ setReports }) {
  return (
    <motion.div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Upload Your Report
      </h2>
      <UploadForm setReports={setReports} />
    </motion.div>
  );
}
