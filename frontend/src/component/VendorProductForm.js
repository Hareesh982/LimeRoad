import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

function VendorProductForm({ user }) {
    const [categoryData, setCategory] = useState("");
    const [subcategoryData, setSubcategory] = useState("");
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        description: '',
        category: '',
        subcategory: '',
        rating: 0,
        brand: '',
        vendor_id: user._id,
        inventory_quantity : 1
    });

    const [files, setFiles] = useState({
        file1: null,
        file2: null,
        file3: null
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            category: categoryData,
            subcategory: subcategoryData
        }));
    }, [categoryData, subcategoryData]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    
    const subcategories = {
        men: ["tshirt", "shirts", "jeans", "trousers", "ethnic", "footwear", "home", "accessory", "winter"],
        women: ["kurthas", "tops", "ethnic", "sarees", "dresses", "suits", "bottoms", "bags", "footwear", "addons", "home", "winter", "lingerie"],
        kids: ["frocks", "twinsets", "tshirts", "shirts", "girlbottom", "tops", "ethnic", "boybottom", "winterwear", "loungewear", "home"]
    };

    const handleFileChange = (event) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [event.target.name]: event.target.files[0]
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!subcategoryData) {
            Swal.fire({
                title: "Please select a subcategory!",
                icon: "warning",
                allowOutsideClick: false,
            });
            return;
        }
        const data = new FormData();
        data.append("title", formData.title);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", categoryData);
        data.append("subcategory", subcategoryData);
        data.append("rating", formData.rating);
        data.append("brand", formData.brand);
        data.append("vendor_id", user._id);
        data.append("inventory_quantity", formData.inventory_quantity);
        
        data.append("file1", files.file1);
        data.append("file2", files.file2);
        data.append("file3", files.file3);

        console.log('FormData:', data);

        try {
            let response = await axios.post('http://127.0.0.1:3005/upload-products', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            let message = response.data.message;
            Swal.fire({
                title: message,
                icon: 'success',
                confirmButtonText: "Click to continue",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload() 
                }
              });

        } catch (error) {
            let message = error.response?.data?.message || "An error occurred.";
            Swal.fire({
                title: message,
                icon: 'error',
            });
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                
                <form onSubmit={handleSubmit}>
                    <div className="col-md-3 mb-3">
                        <select className='form-control'  value={categoryData} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select the category *</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <select className='form-control' value={subcategoryData} onChange={(e) => setSubcategory(e.target.value)}>
                            <option value="">Select the subcategory *</option>
                            {categoryData && subcategories[categoryData]?.map((subcat) => (
                                <option key={subcat} value={subcat.toLowerCase()}>{subcat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input className="form-control" placeholder="Product Title *" type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" placeholder="INR Product Price *" type="number" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <textarea className="form-control" placeholder="Product Description *" type='text' name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Product Image URL *" type="file" name="file1" onChange={(event) => handleFileChange(event)}  accept="image/*"  required />
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Product Sub Image URL *" type="file" name="file2" onChange={(event) => handleFileChange(event)}  accept="image/*" required />
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Product Sub Image URL *" type="file" name="file3" onChange={(event) => handleFileChange(event)}  accept="image/*" required />
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-4">
                        <label><small className='fw-lighter'>Rating</small></label>
                            <input className="form-control" placeholder="Rating *" type="number" name="rating" value={formData.rating} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label><small className='fw-lighter'>Brand</small></label>
                            <input className="form-control" placeholder="Product Brand Name *" type="text" name="brand" value={formData.brand} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label><small className='fw-lighter'>Inventory quantity</small></label>
                            <input className="form-control" placeholder="Product Inventory *"  type="number" min="1" name="inventory_quantity" value={formData.inventory_quantity} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button  type='submit' className="btn btn-primary">Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VendorProductForm;
