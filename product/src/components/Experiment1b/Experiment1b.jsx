import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct, removeProduct } from '../../redux/slices/productsSlice';
import { useState } from 'react';
import '../styles.css';

export const Experiment1b = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (formData.name && formData.price && formData.category) {
      dispatch(
        addProduct({
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
        })
      );
      setFormData({ name: '', price: '', category: '' });
    }
  };

  const handleUpdateProduct = (id) => {
    if (formData.name && formData.price && formData.category) {
      dispatch(
        updateProduct({
          id,
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
        })
      );
      setFormData({ name: '', price: '', category: '' });
      setEditingId(null);
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
    });
    setEditingId(product.id);
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="experiment">
      <h2>Experiment 1b: Redux Toolkit - Product Management</h2>

      <div className="form-section">
        <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleInputChange}
        />
        {editingId ? (
          <>
            <button onClick={() => handleUpdateProduct(editingId)} className="update-btn">
              Update Product
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', price: '', category: '' });
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>

      <div className="products-list">
        <h3>Product List ({products.length})</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
