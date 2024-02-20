import { Module } from '@nestjs/common';
import { TasksController } from './trs-date.controller';
import { TasksService } from './trs-date.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { Task, TaskSchema } from '../schemas/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Task.name,
    schema: TaskSchema,
  }])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
