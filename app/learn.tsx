"use client";
// import Link from "next/link";
import { useEffect, useState } from "react";

function intialCount() {
  return 4;
}

interface funcDataInterface {
  id: number;
  name: string;
}

export default function Home() {
  const [count, setCount] = useState(() => intialCount());

  const [resourceType, setResourceType] = useState("users");

  const [funcData, setFuncData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/" + resourceType)
      .then((response) => response.json())
      .then((json) => setFuncData(json));
  }, [resourceType]);

  function decreaseCount() {
    setCount((prevCount) => prevCount - 1);
  }

  function increaseCount() {
    setCount((prevCount) => prevCount + 1);
  }

  function setResource(resource: string) {
    setResourceType(resource);
  }

  return (
    <>
      {/* <Link href="/users">View All Users</Link>
      <button className="p-2 bg-yellow-200 m-3 rounded">Click Me</button> */}

      <div className="m-3">
        <button className="bg-red-500 p-3 mx-3 rounded" onClick={decreaseCount}>
          Decrease
        </button>
        <span>{count}</span>
        <button
          className="bg-green-500 p-3 mx-3 rounded"
          onClick={increaseCount}
        >
          Increase
        </button>
        <div className="my-3"></div>
        <button
          className="p-1 px-3 bg-cyan-500 mx-3 rounded-full"
          onClick={() => setResource("users")}
        >
          Users
        </button>
        <button
          className="p-2 px-5 bg-slate-600 mx-3 rounded-full text-white"
          onClick={() => setResource("comments")}
        >
          Comments
        </button>
      </div>

      <h1 className="font-bold text-5xl ms-4 capitalize">{resourceType}</h1>

      <table>
        <thead>
          <td>S/N</td>
          <td>Data</td>
        </thead>
        <tbody>
          {funcData.map((funcD: funcDataInterface) => (
            <tr>
              <td>{funcD.id}</td>
              <td>{funcD.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
