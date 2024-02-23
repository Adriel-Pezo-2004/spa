import { Antecedente } from 'src/antecedentes/entities/antecedente.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Interviniente } from 'src/intervinientes/entities/interviniente.entity';
import { PersonaJuridica } from 'src/persona-juridica/entities/persona-juridica.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'titulo_de_propiedad' })
export class TituloPropiedad {
  @PrimaryColumn({
    type: 'char',
    length: 11,
  })
  num_solicitud: string;
  @Column({
    type: 'date', //asi se manda un date "2023-11-21"
  })
  fecha_presentacion: Date;
  @Column({
    type: 'varchar',
    length: 25,
  })
  num_dua: string;
  @PrimaryColumn({
    type: 'char',
    length: 11,
  })
  num_serie: string;
  @PrimaryColumn({
    type: 'char',
    length: 14,
  })
  num_motor: string;
  @Column({
    type: 'varchar',
    length: 25,
  })
  participacion: string;
  @Column({
    type: 'varchar',
    length: 30,
  })
  tipo_registro: string;
 @Column({
    type: 'varchar',
    length: 50,
  })
 
  oficina_magistral:string;
 @Column({
    type: 'varchar',
    length: 200,
  })
  nombre_participante:string;
  @Column({
    type: 'varchar',
    length: 200,
  })
  persona_natural:string;

  @ManyToOne(()=>PersonaJuridica,(personaJuridica)=>personaJuridica.titulosPropiedades)
  persona_juridica:PersonaJuridica;
  @ManyToOne(()=>Antecedente,(antecedente)=>antecedente.titulosPropiedades)
  antecedente:Antecedente;
  @ManyToOne(()=>Cliente,(cliente)=>cliente.cli_doc)
  cliente:Cliente;
  @OneToMany(()=>Interviniente,(interviniente)=>interviniente.tituloPropiedad)
  intervinientes:Interviniente[];
 
}
