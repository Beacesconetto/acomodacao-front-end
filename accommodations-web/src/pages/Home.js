import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccommodations, addAccommodation } from "../redux/reducers/accommodationSlice";
import { Table, Input, Button, Modal, Form } from "antd";

const Home = () => {
  const dispatch = useDispatch();
  const accommodations = useSelector((state) => state.accommodations.accommodations);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchAccommodations());
  }, [dispatch]);

  const filteredAccommodations = accommodations.filter((acc) =>
    acc.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddAccommodation = async (values) => {
    const response = await fetch("http://localhost:8000/acomodacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  
    if (response.ok) {
      dispatch(addAccommodation(values));
      setIsModalOpen(false);
      form.resetFields();
    } else {
      console.error("Erro ao adicionar acomodação");
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
  ];
  

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <Input
        placeholder="Filtrar por local"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      
      <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ marginBottom: 20 }}>Cadastrar Acomodação</Button>

      <Table columns={columns} dataSource={filteredAccommodations} rowKey="id" />

      <Modal title="Cadastrar Acomodação" open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form form={form} onFinish={handleAddAccommodation} layout="vertical">
          <Form.Item name="name" label="Nome" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="image" label="URL da Imagem" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="location" label="Localização" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="price" label="Preço" rules={[{ required: true }]}> <Input type="number" /> </Form.Item>
          <Button type="primary" htmlType="submit">Cadastrar</Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
