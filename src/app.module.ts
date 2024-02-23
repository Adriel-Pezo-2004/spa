import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesModule } from './service/service.module';
import { TituloPropiedadModule } from './issue/titulo-propiedad.module';
import { IntervinientesModule } from './date/intervinientes.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        
        envFilePath:'.env'
      }
    ),
    TypeOrmModule.forRoot(
      {
        type:'mysql',
        host:'localhost',
        port:3306,
        username:'root',
        password:'camila29',
        database:'spadb',
        entities:[__dirname+'/**/*.entity{.ts,.js}'],
        synchronize:true
      }
    ),
    ServicesModule,
    TituloPropiedadModule,
    IntervinientesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
