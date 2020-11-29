import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Saft } from "./Saft";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @OneToMany(type => Saft, saft => saft.user)
    safts!: Saft[];
}
