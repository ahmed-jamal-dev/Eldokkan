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
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProducts: ExpressHandler<getProductsRequest, getProductsResponse> = async (
    req,
    res
) => {
    try {
        const products = await prisma.product.findMany();
        res.status(200).json({
            message: 'Products fetched successfully',
            data: products,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch products', data: [] });
    }
};

export const createProduct: ExpressHandler<createProductRequest, createProductResponse> = async (
    req,
    res
) => {
    try {
        const { title, description, price, userId  } = req.body;

        if (!title || !description || !price || !userId  ) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newProduct = await prisma.product.create({
            data: {
                title,
                description,
                price,
                userId,
            },
        });

        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Failed to create product' });
    }
};
export const getProductById: ExpressHandler<getProductByIdRequest, getProductByIdResponse> = async (
    req,
    res
) => {
    const id = req.body.id;

    try {
        const product = await prisma.product.findUnique({
            where: { id: id },
        });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch product' });
    }
};

export const updateProduct: ExpressHandler<updateProductRequest, updateProductResponse> = async (
    req,
    res
) => {
    const { id, title, description, price, userId } = req.body;

    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                userId,
                title,
                description,
                price,
            },
        });
        res.json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

export const deleteProduct: ExpressHandler<deleteProductRequest, deleteProductResponse> = async (
    req,
    res
) => {
    const id = req.body.id;

    try {
        await prisma.product.delete({
            where: { id: id },
        });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};
