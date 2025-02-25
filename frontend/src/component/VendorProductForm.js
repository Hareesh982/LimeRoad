import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';



function VendorProductForm({ user }) {
    const [categoryData, setCategory] = useState("");
    const [subcategoryData, setSubcategory] = useState("");
    // const [fromSection,setFormSection] = useState(true)
    const [formData, setFormData] = useState({
        title: '',
        price: 0,
        description: '',
        category: '',
        subcategory: '',
        image: '',
        image_2: '',
        image_3: '',
        rating: 0,
        brand: '',
        vendor_id: user._id
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
        kids: ["froks", "twinsets", "tshirts", "shirts", "girlbottom", "tops", "ethnic", "boybottom", "winterwear", "loungewear", "home"]
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

        try {
            let response = await axios.post('http://127.0.0.1:3005/upload-products', formData);
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
                            <input className="form-control" placeholder="Product Image URL *" type="text" name="image" value={formData.image} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Product Sub Image URL *" type="text" name="image_2" value={formData.image_2} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" placeholder="Product Sub Image URL *" type="text" name="image_3" value={formData.image_3} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        <div className="col-md-6">
                            <input className="form-control" placeholder="Rating *" type="number" name="rating" value={formData.rating} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <input className="form-control" placeholder="Product Brand Name *" type="text" name="brand" value={formData.brand} onChange={handleChange} required />
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
