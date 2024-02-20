import { Controller, Get, Post, Put, Delete, Body, Param, ConflictException, NotFoundException, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/services/date/dto/create-task.dto';
import { UpdateTaskDto } from 'src/services/date/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    findAll(){
        return this.tasksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        const tasks = await this.tasksService.findOne(id);
        if (!tasks) throw new NotFoundException('Tasks not found');
        return tasks;        
    }

    @Post()
    async create(@Body() body: CreateTaskDto) {
        try {
            return await this.tasksService.create(body);
        } catch (error) {
            if (error.code === 11000){
                throw new ConflictException("Task Already Exists")
            }
            throw error;
        }
    }

    @Delete(':id') 
    @HttpCode(204)
    async delete(@Param('id') id: string){
        const tasks = await this.tasksService.delete(id);
        if (!tasks) throw new NotFoundException('Tasks not found');
        return tasks;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: UpdateTaskDto){
        const tasks = await this.tasksService.update(id, body);
        if (!tasks) throw new NotFoundException('Tasks not found');
        return tasks;
    }
}
