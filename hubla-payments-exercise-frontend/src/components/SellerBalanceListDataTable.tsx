import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SellerBalanceListDataTable() {

    interface SellerBalance {
        sellerName: string;
        balanceValue: number;
        
    }
    const [data, setData] = useState<Array<SellerBalance>>([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/transaction/sellerBalance`, {
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
        name: 'Seller Name',
        selector: (row: { sellerName: any; }) => row.sellerName,
        },
        {
        name: 'Balance Value',
        selector: (row: { balanceValue: any; }) => row.balanceValue,
        },
    ];

    return (
        <DataTable
        columns={columns}
        data={data}
        />
    );
};

export default SellerBalanceListDataTable;