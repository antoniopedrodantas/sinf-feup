import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./User";

export enum TaxAccountingBasis {
  ACCOUNTABILITY = 'C',
  BILLING = 'F'
}


@Entity()
export class Saft {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date!: Date;
  
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  path!: string;

  @Column()
  fiscal_year!: number;

  @Column({
    type: "character"
  })
  tax_accounting_basis!: TaxAccountingBasis;

  @ManyToOne(type => User, user => user.safts)
  user!: User;
}