import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import bcrypt from 'bcryptjs';
import { Saft } from "./Saft";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({nullable: true})
    jasmin_token!: string;

    @Column({ nullable: true })
    jasmin_token_time!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    @OneToMany(type => Saft, saft => saft.user)
    safts!: Saft[];
}
