import {
    createCategoryRequest,
    createCategoryResponse,
    getCategoryByIdRequest,
    getCategoryByIdResponse,
    updateCategoryRequest,
    updateCategoryResponse,
    deleteCategoryRequest,
    deleteCategoryResponse,
    getCategoriesRequest,
    getCategoriesResponse,
} from '../apis/category.api';
import { ExpressHandler } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory: ExpressHandler<createCategoryRequest, createCategoryResponse> = async (
    req,
    res
) => {
    try {
        const { name, slug } = req.body;

        if (!name || !slug) {
            return res
                .status(400)
                .json({ message: 'Missing required fields: name and slug must be provided' });
        }

        const newCategory = await prisma.category.create({
            data: { name, slug },
        });
        res.status(201).json({ message: 'Category created successfully', data: newCategory });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create category' });
    }
};
export const getCategoryById: ExpressHandler<
    getCategoryByIdRequest,
    getCategoryByIdResponse
> = async (req, res) => {
    const id = req.body.id;

    try {
        const category = await prisma.category.findUnique({
            where: { id: id },
        });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch category' });
    }
};

export const updateCategory: ExpressHandler<updateCategoryRequest, updateCategoryResponse> = async (
    req,
    res
) => {
    const { id, name, slug } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                slug,
            },
        });
        res.json({ message: 'Category updated successfully', data: updatedCategory });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update category' });
    }
};
export const deleteCategory: ExpressHandler<deleteCategoryRequest, deleteCategoryResponse> = async (
    req,
    res
) => {
    const { id } = req.body;

    try {
        await prisma.category.delete({
            where: { id },
        });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

export const getCategories: ExpressHandler<getCategoriesRequest, getCategoriesResponse> = async (
    req,
    res
) => {
    try {
        const categories = await prisma.category.findMany();
        const typedCategories: getCategoriesResponse['data'] =
            categories as unknown as getCategoriesResponse['data'];
        res.json({
            message: 'Categories fetched successfully',
            data: typedCategories,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};
