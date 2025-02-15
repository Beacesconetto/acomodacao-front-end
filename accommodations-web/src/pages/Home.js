import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations } from "../redux/reducers/accommodationSlice";
import { Table, Input, Button, Modal, Form } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

const Home = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const filteredAccommodations = accommodations.filter((acc) =>
    acc.location.toLowerCase().includes(search.toLowerCase())
  );

  const sortedAccommodations = [...filteredAccommodations].sort((a, b) => {
    return b.isFavorited - a.isFavorited;
  });

  const handleCreateAccommodation  = async () => {
    const body = JSON.stringify({
        name,
        image: url,
        location,
        price,
        isFavorited: false
    });

    const response = await fetch("http://localhost:8000/acomodacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (response.ok) {
        dispatch(fetchAccommodations());
        setIsModalOpen(false);
        form.resetFields();
      } else {
        console.error("Erro ao adicionar acomodação");
      }
  };

  const handleFavorite = async (id, isFavorited) => {
    const response = await fetch(`http://localhost:8000/acomodacoes/${id}/favoritar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorited: !isFavorited }),
    });

    if (response.ok) {
      dispatch(fetchAccommodations());
    } else {
      console.error("Erro ao favoritar acomodação");
    }
  };

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { 
      title: "Imagem", 
      dataIndex: "image", 
      key: "image", 
      render: (src) => (
        <a href={src} target="_blank" rel="noopener noreferrer">
          Clique aqui
        </a>
      ) 
    },
    { title: "Localização", dataIndex: "location", key: "location" },
    { 
      title: "Preço", 
      dataIndex: "price", 
      key: "price", 
      render: (price) => `R$ ${price.toFixed(2)}` 
    },
    { 
      title: "Favorito", 
      dataIndex: "isFavorited", 
      key: "isFavorited",
      render: (isFavorited, record) => (
        <Button type="text" onClick={() => handleFavorite(record.id, isFavorited)}>
          {isFavorited ? <StarFilled style={{ color: "gold" }} /> : <StarOutlined />}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <Input
        placeholder="Filtrar por local"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>
        Cadastrar Acomodação
      </Button>

      <Table columns={columns} dataSource={sortedAccommodations} rowKey="id" />

      <Modal title="Cadastrar Acomodação" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nome"> <Input onChange={(e) => setName(e?.target?.value)} /> </Form.Item>
          <Form.Item name="image" label="URL da Imagem"> <Input onChange={(e) => setUrl(e?.target?.value)} /> </Form.Item>
          <Form.Item name="location" label="Localização"> <Input onChange={(e) => setLocation(e?.target?.value)} /> </Form.Item>
          <Form.Item name="price" label="Preço"> <Input onChange={(e) => setPrice(e?.target?.value)} type="number" /> </Form.Item>
          <Button type="primary" onClick={handleCreateAccommodation} htmlType="submit">Cadastrar</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
