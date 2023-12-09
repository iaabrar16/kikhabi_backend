import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from '../schemas/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealService {
  constructor(@InjectModel(Meal.name) private mealModel: Model<Meal>) {}

  async create(createMealDto: CreateMealDto): Promise<Meal> {
    const createdMeal = new this.mealModel(createMealDto);
    return await createdMeal.save();
  }

  async findAll(): Promise<Meal[]> {
    const meals = await this.mealModel.find();
    return meals;
  }

  async findById(id: string): Promise<Meal> {
    const meal = await this.mealModel.findById(id);
    if (!meal) {
      throw new Error('Company not found.');
    }
    return meal;
  }

  async searchByName(search: string): Promise<Meal[]> {
    const meals = await this.mealModel.find({
      name: new RegExp(search, 'i'),
    });
    return meals;
  }

  async update(uuid: string, updateMealDto: UpdateMealDto): Promise<any> {
    const meal = await this.mealModel.updateOne({ uuid }, updateMealDto);
    return meal;
  }

  async remove(uuid: string): Promise<any> {
    const meal = await this.mealModel.deleteOne({ uuid });
    return meal;
  }
}
