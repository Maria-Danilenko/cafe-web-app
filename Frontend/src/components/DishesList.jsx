import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getAllDishes, deleteDish } from "../api/api";

const DishesList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const refresh = () => window.location.reload(true);
  const handleDelete = (id) => {
    deleteDish(id);
    refresh();
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllDishes();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Type id",
      dataIndex: "type_id",
      key: "type_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          {/* <Button type="warning" onClick={() => handleEdit(record)}> */}
          <Button type="primary" ghost style={{ borderColor: "blue" }}  onClick={() => onEdit(record.id)}>
            Edit
          </Button>
          &emsp;          
          <Popconfirm
            title="Delete the dish?"
            description="Are you sure to delete this dish?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },

  ];

  // return <Table columns={columns} dataSource={products} />;
  return (
    <Table columns={columns}
      dataSource={products.map((product) => ({
        ...product,
        key: product.id,
      }))}
    />
  );

};

export default DishesList;
