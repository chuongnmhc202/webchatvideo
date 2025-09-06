import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { User } from "./UserEntity";

@Entity("usersession")
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_phone", referencedColumnName: "phone" })
  user: User;

  @Column({ type: "varchar", length: 100 })
  user_phone: string;

  @CreateDateColumn({ type: "datetime", precision: 3, default: () => "CURRENT_TIMESTAMP(3)" })
  loginAt: Date;

  @UpdateDateColumn({ type: "datetime", precision: 3, nullable: true })
  logoutAt: Date | null;

  @Column({ type: "varchar", length: 45, nullable: true })
  ipAddress: string | null;

  @Column({ type: "text", nullable: true })
  userAgent: string | null;

  @Column({ type: "varchar", length: 20, default: "ONLINE" })
  status: string; // ONLINE / OFFLINE

    @BeforeInsert()
  setLogoutDefault() {
    if (!this.logoutAt) {
      const login = this.loginAt ? new Date(this.loginAt) : new Date();
      login.setHours(login.getHours() + 5); // cộng 5 tiếng
      this.logoutAt = login;
    }
  }


}
