import { Entity, PrimaryColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./UserEntity";
@Entity("friend")
export class Friend {
  @PrimaryColumn({ type: "varchar", length: 100 })
  user_phone: string;

  @PrimaryColumn({ type: "varchar", length: 100 })
  friend_phone: string;

  @Column({ type: "enum", enum: ["no", "pending", "accepted", "blocked"] })
  status: "no" | "pending" | "accepted" | "blocked";

  @CreateDateColumn({ type: "datetime", precision: 3, nullable: true, default: () => "CURRENT_TIMESTAMP(3)" })
  created_at: Date;

  @Column({ type: "text", nullable: true })
  last_message: string;


  @Column({ type: "datetime", precision: 3, nullable: true })
  last_message_date: Date;

  @Column({ type: 'int', default: 0 })
  unread_count_user: number;

  @Column({ type: 'int', default: 0 })
  unread_count_friend: number;

  // Eager load the friend entity
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'friend_phone', referencedColumnName: 'phone' })
  friend: User;
  
  // Eager load the user entity
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_phone', referencedColumnName: 'phone' })
  user: User;
}
