import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import SalesList from "./SalesList";
import { Button } from 'react-bootstrap';
import AddSaleWindow from "./AddSaleWindow";
import EditProviderWindow from './EditProviderWindow';
import {getTotalRevenue} from '../api/api';

const { Content } = Layout;

const SalesPage = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSaleId, setSelectedSaleId] = useState(null);
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

    const handleShowDetailsModal = (providerId) => {
        setSelectedSaleId(providerId);
        setShowEditModal(true);
    };

    const handleCloseDetailsModal = () => {
        setShowEditModal(false);
    };

    return (
        <Layout>
            <div className="fs-5 ms-3 my-2"><b>Total revenue:</b> {totalRevenue}₴</div>
            <Content>
                <SalesList onEdit={handleShowDetailsModal} />
            </Content>
            <div>
                <Button type="button" className="btn btn-success" onClick={handleShowAddModal}>
                    Add Sale
                </Button>
                <AddSaleWindow show={showAddModal} onClose={handleCloseAddModal} />
                {selectedSaleId && (
                    <EditProviderWindow
                        show={showEditModal}
                        onClose={handleCloseDetailsModal}
                        providerId={selectedSaleId}
                    />
                )}
            </div>
        </Layout>
    );
};
export default SalesPage;