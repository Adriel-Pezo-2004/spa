import { Module } from '@nestjs/common';
import { TasksModule } from './services/date/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/tasksdb'),
  TasksModule],
})
export class AppModule {}
