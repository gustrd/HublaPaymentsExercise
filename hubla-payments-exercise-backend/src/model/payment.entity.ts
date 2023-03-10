import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity({ name: 'transaction' })
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'integer', nullable: false })
    transactionType: number;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    transactionDate: Date;

    @Column({ type: 'varchar', length: 30, nullable: false })
    productDescription: string;

    @Column({ type: 'float', nullable: false })
    transactionValue: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    sellerName: string;
}