import { PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export abstract class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'integer', nullable: false })
    transactionType: number;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    transactionDate: Date;

    @Column({ type: 'varchar', length: 30, nullable: false })
    productDescription: string;

    @Column({ type: 'number', nullable: false })
    transactionValue: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    sellerName: string;
}