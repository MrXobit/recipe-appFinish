import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller()
export class RecipeController {
 constructor(private recipeService: RecipeService) {}

    @Get()
    getAll() {
        return this.recipeService.getAll()
    }

    @Get(':id')
    async getOne(@Param('id') id: string) {
      return this.recipeService.getOneRecipe(id);
    }

     @Get('search')
   async search(@Query('query') query: string) {
     return this.recipeService.searchRecipes(query);
   }

   @Post('/addrecipe')
   @UseInterceptors(FileFieldsInterceptor([
    { name: 'picture', maxCount: 1 },
]))
   addRecipe(@UploadedFiles() files ,@Body() dto: CreateRecipeDto) {
    const { picture }  = files
      return this.recipeService.createRecipe(dto, picture[0])
   }



}