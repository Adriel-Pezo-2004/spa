import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTituloPropiedadDto {
  @IsNotEmpty()
  @IsString()
  @Length(11)
  num_solicitud: string;
  @IsNotEmpty()
  fecha_presentacion: Date;
  @IsNotEmpty()
  num_dua: string;
  @IsNotEmpty()
  num_serie: string;
  @IsNotEmpty()
  num_motor: string;
  @IsNotEmpty()
  participacion: string;
  @IsNotEmpty()
  tipo_registro: string;
  @IsNotEmpty()
  oficina_magistral: string;
  @IsNotEmpty()
  nombre_participante: string;
  @IsNotEmpty()
  persona_natural: string;
}
