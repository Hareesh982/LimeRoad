
const Product = require('../model/products')

const uploadProducts = async(req,res) =>{
    try{
        let { title, price, description, category, subcategory, rating, brand, vendor_id, inventory_quantity } = req.body;
        console.log({ title, price, description, category, subcategory, rating, brand, vendor_id, inventory_quantity });
        let size;
        if (category === 'men' || category === 'women') {
            size = ['S', 'M', 'L', 'XL'];
        } else {
            size = ['5 years', '8 years', '10 years', '12 years', '14 years'];
        }

        let stock_quantity = 0;
        let available_quantity = inventory_quantity;

        console.log('Files received:', req.files);

        const formatImagePath = (filename) => `http://13.235.24.94:3005/uploads/${filename}`;

        let image_path = req.files['file1'] ? formatImagePath(req.files['file1'][0].filename) : null;
        let image_2path = req.files['file2'] ? formatImagePath(req.files['file2'][0].filename) : null;
        let image_3path = req.files['file3'] ? formatImagePath(req.files['file3'][0].filename) : null;

        if (!image_path || !image_2path || !image_3path) {
            return res.status(400).json({ message: 'All three image files are required' });
        }

        console.log('File paths:', image_path, image_2path, image_3path);

        let product = new Product({
            title,
            price,
            description,
            category,
            subcategory,
            image: image_path,
            image_2: image_2path,
            image_3: image_3path,
            rating: { rate: rating },
            size,
            brand,
            vendor_id,
            inventory_quantity,
            stock_quantity,
            available_quantity
        });
        await product.save();
        return res.status(201).json({ message: 'Product uploaded successfully' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = uploadProducts