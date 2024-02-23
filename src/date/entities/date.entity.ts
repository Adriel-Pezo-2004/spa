import { TituloPropiedad } from "src/titulo-propiedad/entities/titulo-propiedad.entity";
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
  /*
  @OneToMany(
    () => TituloPropiedad,
    (tituloPropiedad) => tituloPropiedad.antecedente,
  )
  titulosPropiedades: TituloPropiedad[];*/
}

