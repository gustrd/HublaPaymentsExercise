import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

function TransactionListDataTable() {

    interface Transaction {
        id: string;
        transactionType: number;
        transactionDate: string;
        productDescription: string;
        transactionValue: number;
        sellerName: string;
    }
    const [data, setData] = useState<Array<Transaction>>([]);

    useEffect(() => {
        fetch("http://localhost:3000/transaction", {
        "headers": {
            "accept": "*/*"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors"
        })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    const columns = [
        {
        name: 'ID',
        selector: (row: { id: any; }) => row.id,
        },
        {
        name: 'Transaction Type',
        selector: (row: { transactionType: any; }) => row.transactionType,
        },
        {
        name: 'Transaction Date',
        selector: (row: { transactionDate: any; }) => row.transactionDate,
        },
        {
        name: 'Product Description',
        selector: (row: { productDescription: any; }) => row.productDescription,
        },
        {
        name: 'Transaction Value',
        selector: (row: { transactionValue: any; }) => row.transactionValue,
        },
        {
        name: 'Seller Name',
        selector: (row: { sellerName: any; }) => row.sellerName,
        },
    ];

    return (
        <DataTable
        columns={columns}
        data={data}
        />
    );
};

export default TransactionListDataTable;