import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true,
})

export class Task {
    @Prop({
        unique: true,
        required: true,
        trim: true
    })
    title: string;

    @Prop({
        trim: true
    })
    cost: number;

    @Prop({
        default: false,
    })
    done: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task)