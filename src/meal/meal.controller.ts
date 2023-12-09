import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from '../schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) {}

  @Get()
  async getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Post()
  async createMeal(
    @Body()
    meal: CreateMealDto,
  ): Promise<Meal> {
    return this.mealService.create(meal);
  }

  @Get(':id')
  async getMeal(
    @Param('id')
    id: string,
  ): Promise<Meal> {
    return this.mealService.findById(id);
  }

  @Get('?search=')
  async searchCompany(
    @Query('search')
    search: string,
  ): Promise<Meal[]> {
    return this.mealService.searchByName(search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(id);
  }
}
