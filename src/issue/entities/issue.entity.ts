
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'issue' })
export class Issue {
  @PrimaryColumn({
    type: 'char',
    length: 10,
  })
  issueCode: string;
  /*
  @Column({
    type: 'date', //asi se manda un date "2023-11-21"
  })
  fecha_presentacion: Date;*/
  @PrimaryColumn({
    type: 'char',
    length: 10,
  })
  datedCode: string;
  @Column("decimal", { precision: 5, scale: 2 })
  pay: number;
}
