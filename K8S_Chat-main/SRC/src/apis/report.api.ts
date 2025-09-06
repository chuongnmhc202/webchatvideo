import http from 'src/utils/http'
import { SuccessResponse } from 'src/types/utils.type'

// Kiểu dữ liệu Report
export interface Report {
  id: string
  reported_phone: string
  reporter_phone: string
  reason: string
  status: 'PENDING' | 'REVIEWED' | 'REJECTED'
  createdAt: string
}

interface CreateReportBody {
  reported_phone: string
  reporter_phone: string
  reason: string
}

interface CreateRPass {
  phone: string
  email: string
}

interface UpdateReportStatusBody {
  status: 'PENDING' | 'REVIEWED' | 'REJECTED'
}

const reportApi = {
  // ➕ Tạo report mới
  createReport(body: CreateReportBody) {
    return http.post<Report>('/api/user/user/report', body)
  },

  // 📅 Lấy danh sách report theo ngày (YYYY-MM-DD)
  getReportsByDate(date: string) {
    return http.get<Report[]>(`/api/user/user/report/date/${date}`)
  },

  // 🔄 Cập nhật trạng thái report
  updateReportStatus(id: string, body: UpdateReportStatusBody) {
    return http.patch<Report>(`/api/user/user/report/${id}/status`, body)
  }
  ,
    createForgotPass(body: CreateRPass) {
    return http.post<String>('/api/user/user/forgot-pass', body)
  },
}

export default reportApi


