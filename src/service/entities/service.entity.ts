import { Dated } from 'src/date/entities/date.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'servicio' })
export class Servicio {
  @PrimaryColumn({
    type: 'char',
    length: 10,
  })
  serviceCode: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;
  @Column("decimal", { precision: 5, scale: 2 })
  price: number;
  
  @OneToMany(
    () => Dated,
    (Dated) => Dated.servicios,
  )
  dates: Dated[];
}
