import { createProduct, updateProduct, deleteProduct } from "@/controllers/productController";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
import withAuth from "@/middlewares/auth";

async function handler(req, res) {
    // const session = await getServerSession({ req, ...authOptions })
    if (req.method === 'POST') {
        // if (session?.user?.role !== 'admin') return res.status(403).json({ message: 'You are not authorized to access this resource.' })
        // const { name, price, description, image } = req.body;
        // const data = { name, price, description, image };
        // const product = await createProduct(data);
        // return res.status(200).json(product);
        return res.status(200).json({ message: 'Product created successfully.' });
    }else if (req.method === 'GET') {
        // if (session?.user?.role !== 'admin') return res.status(403).json({ message: 'You are not authorized to access this resource.' })
        // const products = await getAllProducts();
        // return res.status(200).json(products);
        return res.status(200).json({ message: 'Product get successfully.' });
    }
     else if (req.method === 'PUT') {
        // if (session?.user?.role !== 'admin') return res.status(403).json({ message: 'You are not authorized to access this resource.' })
        // const { id, name, price, description, image } = req.body;
        // const data = { name, price, description, image };
        // const product = await updateProduct(id, data);
        // return res.status(200).json(product);
        return res.status(200).json({ message: 'Product updated successfully.' });
    } else if (req.method === 'DELETE') {
        // if (session?.user?.role !== 'admin') return res.status(403).json({ message: 'You are not authorized to access this resource.' })
        // const { id } = req.body;
        // const product = await deleteProduct(id);
        // return res.status(200).json(product);
        return res.status(200).json({ message: 'Product delete successfully.' });
    }
}

export default withAuth(handler);