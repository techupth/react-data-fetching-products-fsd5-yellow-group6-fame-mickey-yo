import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const productDetail = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result);
    setProducts(result.data.data);
  };
  useEffect(() => {
    productDetail();
  }, []);
  const deleteProduct = async (id) => {
    const result = await axios
      .delete(`http://localhost:4001/products/${id}`)
      .then(productDetail);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((item, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  deleteProduct(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
