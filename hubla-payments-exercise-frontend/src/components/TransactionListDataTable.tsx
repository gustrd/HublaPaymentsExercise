import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {toast} from 'react-toastify';
import fetch from 'cross-fetch';
import 'react-toastify/dist/ReactToastify.css';

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
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/transaction`, {
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
        .catch(error => toast("There was an error loading the data. Is the server down?"));
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