import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const result = await axios.get("http://localhost:4001/products");
      setLoading(false);

      setProducts(result.data.data);
    } catch (error) {
      alert("Fetching error");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProducts = async (id) => {
    await axios
      .delete(`http://localhost:4001/products/${id}`)
      .then(getProducts)
      .catch(() => alert("error"));
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
}

export default App;
