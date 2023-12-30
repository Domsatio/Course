import {db} from '@/libs/prisma';

const createProduct = async (data) => {
    return db.product.create({ data });
}

const updateProduct = async (id, data) => {
    return db.product.update({
        where: { id },
        data,
    });
};

const deleteProduct = async (id) => {
    return db.product.delete({
        where: { id },
    });
}

export { createProduct, updateProduct, deleteProduct };