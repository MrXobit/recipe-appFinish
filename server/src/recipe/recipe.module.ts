import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipe, RecipeSchema } from './shemas/recipe.shema';
import { MongooseModule } from '@nestjs/mongoose';
import { fileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Recipe.name, schema: RecipeSchema}]),
    FileModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService, fileService]
})
export class RecipeModule {}
