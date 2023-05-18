import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { getAllProviders, deleteProvider } from "../api/api";

function formatDate(date) {
  const formattedDate = new Date(date).toLocaleString();
  const cutIndex = formattedDate.indexOf(",");
  return formattedDate.substring(0, cutIndex);
}

const ProvidersList = ({ onEdit }) => {
  const [providers, setProviders] = useState([]);
  const refresh = () => window.location.reload(true);
  const handleDelete = (id) => {
    deleteProvider(id);
    refresh();
  }

  useEffect(() => {
    const fetchProviders = async () => {
      const data = await getAllProviders();
      setProviders(data);
    };
    fetchProviders();
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
      title: "Company name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Date of contract sign",
      dataIndex: "date_of_contract_sign",
      key: "date_of_contract_sign",
      render: (text) => formatDate(text), 
    },
    {
      title: "Ingredients count",
      dataIndex: "ingredients_count",
      key: "ingredients_count",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button type="primary" ghost style={{ borderColor: "blue" }} onClick={() => onEdit(record.id)}>
            Edit
          </Button>
          &emsp;          
          <Popconfirm
            title="Delete the provider?"
            description="Are you sure to delete this provider?"
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

  return (
    <Table columns={columns}
      dataSource={providers.map((provider) => ({
        ...provider,
        key: provider.id,
      }))}
    />
  );

};

export default ProvidersList;