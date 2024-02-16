"use client";
// import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addProduct = () => {
    fetch("http://localhost/coding-test/app/includes/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, price: price, quantity: quantity }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                className="btn btn-success text-white hover:bg-white hover:ring-green-500 hover:ring hover:text-black"
                onClick={addProduct}
              >
                Add Product
              </button>
            </div>
            <h1 className="text-3xl font-bold my-5">All Product</h1>
            <div className="hero">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Date Created</td>
                    <td>Date Updated</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Udumah Victor</td>
                    <td>$1300</td>
                    <td>24 Pieces</td>
                    <td>24th January, 2023</td>
                    <td>25th January, 2023</td>
                  </tr>
                  <tr>
                    <td>Dan Jesse Finn</td>
                    <td>$24</td>
                    <td>24 Pieces</td>
                    <td>24th January, 2023</td>
                    <td>11th January, 2024</td>
                  </tr>
                  <tr>
                    <td>Akalazu Udochukwu David</td>
                    <td>$1300</td>
                    <td>24 Pieces</td>
                    <td>24th January, 2024</td>
                    <td>21st July, 2024</td>
                  </tr>
                  <tr>
                    <td>Akalazu Udochukwu David</td>
                    <td>$1300</td>
                    <td>24 Pieces</td>
                    <td>24th January, 2023</td>
                    <td>11th January, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
