import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { School } from "./school.entity";
import { User } from "./user.entity";

@Entity()
export class SchoolLike {
    @PrimaryColumn({ name: 'user_id' })
    user_id: number;

    @PrimaryColumn({ name: 'school_id' })
    school_id: number;

    @ManyToOne(() => User, (user) => user.schoolLike)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => School, (school) => school.schoolLike)
    @JoinColumn({ name: 'school_id' })
    school: School;
}