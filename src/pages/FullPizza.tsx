import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function FullPizza ()  {
  const [pizza, setPizza] = useState <{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6298b336f2decf5bb749749e.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы!");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className="container full-pizza">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p></p>
      <h4>{pizza.price} р</h4>
    </div>
  );
}

export default FullPizza;
