import {
    createProductRequest,
    createProductResponse,
    deleteProductRequest,
    deleteProductResponse,
    getProductByIdRequest,
    getProductByIdResponse,
    getProductsRequest,
    getProductsResponse,
    updateProductRequest,
    updateProductResponse,
} from '../apis/product.api';
import { ExpressHandler } from '@/types';
import { prisma } from '../datastore';
import { Product } from '../types/product';


export const getProducts: ExpressHandler<getProductsRequest, getProductsResponse> = async (
    req,
    res
) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        res.status(200).json({
            message: 'Products fetched successfully',
            data: products as unknown as Product[],
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({
            message: 'Failed to fetch products',
            data: [],
        });
    }
};


export const createProduct: ExpressHandler<createProductRequest, createProductResponse> = async (
    req,
    res
) => {
    try {
        const { title, description, price, userId, categoryId } = req.body;

        if (!title || !price || !userId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price,
                userId,
                categoryId,
            },
            include: {
                category: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        res.status(201).json({
            message: 'Product created successfully',
            data: newProduct as unknown as Product,
        });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Failed to create product' });
    }
};


export const getProductById: ExpressHandler<getProductByIdRequest, getProductByIdResponse> = async (
    req,
    res
) => {
    const { id } = req.body;

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found', data: null });
        }

        res.status(200).json({
            message: 'Product fetched successfully',
            data: product as unknown as Product,
        });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: 'Failed to fetch product', data: null });
    }
};


export const updateProduct: ExpressHandler<updateProductRequest, updateProductResponse> = async (
    req,
    res
) => {
    const { id, title, description, price, userId, categoryId } = req.body;

    try {
        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({
                message: 'Product not found',
                data: null as any,
            });
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                title,
                description,
                price,
                userId,
                categoryId,
            },
            include: {
                category: true,
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
        });

        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct as unknown as Product,
        });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({
            message: 'Failed to update product',
            data: null as any,
        });
    }
};


export const deleteProduct: ExpressHandler<deleteProductRequest, deleteProductResponse> = async (
    req,
    res
) => {
    const { id } = req.body;

    try {
        const existingProduct = await prisma.product.findUnique({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await prisma.product.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
