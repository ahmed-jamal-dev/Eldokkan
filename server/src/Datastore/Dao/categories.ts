import { Category } from "@/types";

export interface CategoryDao {
  createCategory(category: Omit<Category, "id" | "created_at">): Promise<Category>;
  getCategoryById(id: string): Promise<Category | undefined>;
  listCategories(): Promise<Category[]>;
  deleteCategory(id: string): Promise<void>;
}
