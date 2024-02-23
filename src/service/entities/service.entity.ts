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
  @Column({
    type: 'number'
  })
  price: number;
  Dated: any;
  
  @OneToMany(
    () => Date,
    (Date) => Date.Serviced,
  )
  dates: Date[];
}
