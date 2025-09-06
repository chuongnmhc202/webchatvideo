import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./UserEntity";

@Entity("report")
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // Người bị báo cáo
  @ManyToOne(() => User)
  @JoinColumn({ name: "reported_phone" })
  reportedUser: User;

  @Column({ type: "varchar", length: 100 })
  reported_phone: string;

  // Người gửi báo cáo
  @ManyToOne(() => User)
  @JoinColumn({ name: "reporter_phone" })
  reporterUser: User;

  @Column({ type: "varchar", length: 100 })
  reporter_phone: string;

  // Nội dung báo cáo
  @Column({ type: "text" })
  reason: string;

  // Trạng thái xử lý (PENDING, REVIEWED, REJECTED...)
  @Column({ type: "varchar", length: 20, default: "PENDING" })
  status: string;

  // Thời điểm tạo report
  @CreateDateColumn({ type: "datetime", precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  createdAt: Date = new Date();
}
