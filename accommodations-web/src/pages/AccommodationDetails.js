import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin } from "antd";

const AccommodationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const response = await fetch(`http://localhost:8000/acomodacoes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAccommodation(data);
        } else {
          console.error("Erro ao buscar detalhes da acomodação");
        }
      } catch (error) {
        console.error("Erro de conexão", error);
      }
      setLoading(false);
    };

    fetchAccommodation();
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "50px auto" }} />;
  }

  if (!accommodation) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Acomodação não encontrada</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card
        style={{ width: 400, textAlign: "center", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
        cover={<img alt={accommodation.name} src={accommodation.image} style={{ height: 200, objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />}
      >
        <h2>{accommodation.name}</h2>
        <p><strong>Localização:</strong> {accommodation.location}</p>
        <p><strong>Preço:</strong> R$ {accommodation.price.toFixed(2)}</p>
        <Button type="primary" onClick={() => navigate("/")}>Voltar para Home</Button>
      </Card>
    </div>
  );
};

export default AccommodationDetails;
