import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Button } from 'react-bootstrap';
import SalesList from "./SalesList";
import AddSaleWindow from "./AddSaleWindow";
import {getTotalRevenue} from '../api/api';

const { Content } = Layout;

const SalesPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [totalRevenue, setTotalRevenue] = useState(0);

    useEffect(() => {
        const totalRevenue = async () => {
            const totalRevenue = await getTotalRevenue();
            setTotalRevenue(totalRevenue);        
        };
        totalRevenue();
      }, []);
    

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    return (
        <Layout>
            <div className="fs-5 ms-3 my-2"><b>Total revenue:</b> {totalRevenue}₴</div>
            <Content>
                <SalesList />
            </Content>
            <div>
                <Button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                    Add Sale
                </Button>
                <AddSaleWindow show={showAddModal} onClose={handleCloseAddModal} />             
            </div>
        </Layout>
    );
};
export default SalesPage;