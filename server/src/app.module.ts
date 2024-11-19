import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'), 
      serveRoot: '/static', 
    }),
    MongooseModule.forRoot('mongodb+srv://marcis2023vlad:root@cluster0.836gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    RecipeModule
  ]
})
export class AppModule {}
