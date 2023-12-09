import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MealDocument = HydratedDocument<Meal>;

@Schema()
export class Meal {
  @Prop({ required: true })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  price: string;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
