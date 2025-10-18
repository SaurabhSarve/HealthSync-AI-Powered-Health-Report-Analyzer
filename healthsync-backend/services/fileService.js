// services/fileService.js
import fs from "fs";

export const deleteFile = (path) => {
  try {
    fs.unlinkSync(path);
  } catch (err) {
    console.warn("⚠️ File deletion failed:", err.message);
  }
};

export default { deleteFile };
