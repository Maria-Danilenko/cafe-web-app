import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Modal } from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from '../styles/saleDetails.module.css'
import { getAllSales, deleteSale, getDish, getTypeByTypeId } from "../api/api";

function formatDate(date) {
  const formattedDate = new Date(date).toLocaleString();
  const cutIndex = formattedDate.indexOf(",");
  return formattedDate.substring(0, cutIndex);
}

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const refresh = () => window.location.reload(true);

  const handleDelete = (id) => {
    deleteSale(id);
    refresh();
  };

  const handleDetails = async (id) => {
    const sale = sales.find((sale) => sale.id === id);
    setSelectedSale(sale);
  
    try {
      const dish = await getDish(sale.dish_id);
      setSelectedDish(dish);
  
      const type = await getTypeByTypeId(sale.type_id);
      setSelectedType(type);
  
      setModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSales = async () => {
      const data = await getAllSales();
      setSales(data);
    };
    fetchSales();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Dish id",
      dataIndex: "dish_id",
      key: "dish_id",
    },
    {
      title: "Type id",
      dataIndex: "type_id",
      key: "type_id",
    },
    {
      title: "Date of sale",
      dataIndex: "date_of_sale",
      key: "date_of_sale",
      render: (text) => formatDate(text),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            type="primary"
            ghost
            style={{ borderColor: "blue" }}
            onClick={() => handleDetails(record.id)}
          >
            Details
          </Button>
          &emsp;
          <Popconfirm
            title="Delete the sale?"
            description="Are you sure to delete this sale?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={sales.map((sale) => ({
          ...sale,
          key: sale.id,
        }))}
      />
      <Modal
        title="Sale Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedSale && (
          <>
            <p className={styles.font}><b>Id:</b> {selectedSale.id}</p>
            <p className={styles.font}><b>Dish id:</b> {selectedSale.dish_id}</p>
            {selectedDish && <p className={styles.font}><b>Dish name:</b> {selectedDish.name}</p>}
            <p className={styles.font}><b>Type id:</b> {selectedSale.type_id}</p>
            {selectedType && <p className={styles.font}><b>Type name:</b> {selectedType}</p>}
            {selectedDish && <p className={styles.font}><b>Price:</b> {selectedDish.price}₴</p>}
            <p className={styles.font}><b>Date of sale:</b> {formatDate(selectedSale.date_of_sale)}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default SalesList;