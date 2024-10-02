import { defineStore } from "pinia";
import IngredientRepository from '../repositories/IngredientRepository';

export const useIngredientsStore = defineStore('ingredients', {
    state: () => ({
        ingredients: [],
    }),
    actions: {
        async fetchIngredients() {
            this.ingredients = await IngredientRepository.getAllIngredients();
        },
        async createIngredient(ingredient) {
            await IngredientRepository.createIngredient(ingredient);
            await this.fetchIngredients();
        },
        async updateIngredient(id, ingredient) {
            await IngredientRepository.updateIngredient(id, ingredient);
            await this.fetchIngredients();
        },
        async deleteIngredient(id) {
            await IngredientRepository.deleteIngredient(id);
            await this.fetchIngredients();
        }
    }
});
