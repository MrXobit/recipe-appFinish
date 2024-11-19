import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema()
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [String], required: true })
  ingredients: string[];

  @Prop({ required: true })
  instructions: string;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}


export const RecipeSchema = SchemaFactory.createForClass(Recipe);
