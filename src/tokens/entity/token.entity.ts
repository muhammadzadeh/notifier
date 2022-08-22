import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
    name: 'tokens',
    schema: 'notifier'
})
export class TokenEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 400,
    })
    @Index('token_constraint')
    token: string;

    @Column({
        name: 'user_id',
        type: 'varchar',
        length: 100,
    })
    @Index('user_id_constraint')
    userId: string;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
}