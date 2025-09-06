import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import reportApi, { Report } from "src/apis/report.api"; // import api

export default function ListReport() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // 📅 Lấy danh sách report theo ngày
  const getReportsByDate = async (date: string) => {
    try {
      const res = await reportApi.getReportsByDate(date);
      setReports(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách báo cáo:", error);
    }
  };

  // 🔄 Cập nhật trạng thái report
  const updateReportStatus = async (id: string, status: Report["status"]) => {
    try {
      await reportApi.updateReportStatus(id, { status });
      setReports((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast.success("cập nhật thành công")
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái báo cáo:", error);
    }
  };

  // 👉 Set mặc định ngày hôm nay khi mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    setSelectedDate(today);
    getReportsByDate(today);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Danh Sách Báo Cáo</h1>

      {/* Bộ lọc ngày */}
      <div className="flex gap-3 mb-6">
        <input
          type="date"
          className="border rounded px-3 py-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          onClick={() => getReportsByDate(selectedDate)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Lọc theo ngày
        </button>
      </div>

      {/* Bảng báo cáo */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Người Báo Cáo</th>
            <th className="border px-4 py-2">Người Bị Báo Cáo</th>
            <th className="border px-4 py-2">Lý Do</th>
            <th className="border px-4 py-2">Ngày Tạo</th>
            <th className="border px-4 py-2">Trạng Thái</th>
            <th className="border px-4 py-2">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="border px-4 py-2">{report.reporter_phone}</td>
              <td className="border px-4 py-2">{report.reported_phone}</td>
              <td className="border px-4 py-2">{report.reason}</td>
              <td className="border px-4 py-2">
                {new Date(report.createdAt).toLocaleString("vi-VN")}
              </td>
              <td className="border px-4 py-2">
                <select
                  value={report.status}
                  onChange={(e) =>
                    updateReportStatus(report.id, e.target.value as Report["status"])
                  }
                  className="border rounded px-2 py-1"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="REVIEWED">REVIEWED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => updateReportStatus(report.id, report.status)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Lưu
                </button>
              </td>
            </tr>
          ))}
          {reports.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                Không có báo cáo nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
