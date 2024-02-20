"use client";
// import Link from "next/link";
import { useEffect, useState } from "react";

interface productInterface {
  id: number;
  title: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch("./app/includes/api.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Add product to database
  const addProduct = () => {
    fetch("./app/includes/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, price: price, quantity: quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == false) {
          alert("Error! Product already exists");
        }
        if (data.message == "error") {
          alert("Error! Kindly fill all fields");
        }
        // Refresh products list
        setName("");
        setPrice("");
        setQuantity("");
        fetchProducts();
      })
      .catch((e) => console.log({ e }));
  };

  // Fetch Product from Database
  const fetchProducts = () => {
    fetch("http://localhost/coding-test/app/includes/api.php")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  // Event handler for the quantity input fields
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Check if the input value is an integer
    if (!/^\d+$/.test(value)) {
      alert("Error! Please enter a valid integer for quantity.");
      return;
    } else if (value.length < 1) {
      alert("Error! Field cannot be empty");
      return;
    }
    setQuantity(value);
  };

  return (
    <>
      <div className="hero bg-base-50">
        <div className="hero-content text-center">
          <div className="max-w-max">
            <h1 className="text-3xl font-bold my-5">Add Product</h1>
            <div className="addProduct m-2 p-2 grid grid-cols-2 min-w-full gap-2">
              <input
                type="text"
                placeholder="Name"
                className="border p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border p-2"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                className="btn btn-success text-white hover:bg-white hover:ring-green-500 hover:ring hover:text-black"
                onClick={addProduct}
              >
                Add Product
              </button>
            </div>
            <h1 className="text-3xl font-bold my-5 mt-20">All Product</h1>
            <div className="hero">
              <table className="table table-zebra text-center">
                <thead>
                  <tr className="px-20">
                    <td>S/N</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Date Created</td>
                    <td>Date Updated</td>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: productInterface) => (
                    <tr key={product.id} className="px-20">
                      <td>{product.id}.</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {product.title}
                      </td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.created_at}</td>
                      <td>{product.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
