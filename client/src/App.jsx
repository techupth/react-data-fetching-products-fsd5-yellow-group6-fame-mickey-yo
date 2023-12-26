import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const result = await axios.get("http://localhost:4001/products");
    console.log(result.data.data);
    setProducts(result.data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProducts = async (id) => {
    await axios
      .delete(`http://localhost:4001/products/${id}`)
      .then(getProducts);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((data, index) => {
          return (
            <div className="product" key={index}>
              <div className="product-preview">
                <img
                  src={data.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {data.name}</h1>
                <h2>Product price: {data.price} Baht</h2>
                <p>Product description: {data.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  deleteProducts(data.id);
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
