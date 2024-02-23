import { Servicio } from "src/service/entities/service.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";


@Entity({ name: 'dated' })
export class Dated {
  @PrimaryColumn({
    type: 'char',
    length: 10,
  })
  datedCode: string;
  @Column({
    type: 'char',
    length: 10,
  })
  servicioCode: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  nameClient: string;
  
  @ManyToOne(
    () => Servicio,
    (Servicio) => Servicio.Dated,
  )
  servicios: Servicio[];
}

