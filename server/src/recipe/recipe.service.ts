import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Recipe, RecipeDocument } from "./shemas/recipe.shema";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { fileService } from "src/file/file.service";


@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
 private fileService : fileService
) {}

  async getAll(): Promise<Recipe[]> {
    const recipes = await this.recipeModel.find()
    return recipes;
}

async searchRecipes(query: string): Promise<Recipe[]> {
    return this.recipeModel.find({ name: new RegExp(query, 'i') }).exec();
  }

     async  getOneRecipe (id: string): Promise<Recipe> {
        const recipe = await this.recipeModel.findById(id); 
        return recipe;
  }


  async createRecipe(dto: CreateRecipeDto, picture: string): Promise<Recipe> {
     const imagePath = this.fileService.createFile(picture)
     const recive = await this.recipeModel.create({...dto, image: imagePath})
     return recive
  }

}