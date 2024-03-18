import DataTable from "react-data-table-component";
import CurrencyCode from "../../../../helper/currencyCode/CurrencyCode";

function Advertis() {
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            cell: (e) => (
                <div>
                    {e.name}<br/>
                    <span className="blue">Product Sponsor</span>
                </div>
            )
        },

        {
            name: "STATUS",
            selector: (row) => row.status,
            
            cell: (e) => (
                <div className={`${e.status == "Cancelled" ? 'cancelled' : e.status == "Pending" ? 'pending' : e.status == "Completed" ? 'completed' : null} status`}>
                    {e.status}
                </div>
            )
        },
        {
            name: "SPEND",
            selector: (row) => row.spend,
            cell: (e) => (
                <div >
                    {CurrencyCode(e.spend)}
                </div>
            )
        },
        {
            name: "AD SALES",
            selector: (row) => row.ad_sales,
            cell: (e) => (
                <div >
                    {CurrencyCode(e.ad_sales)}
                </div>
            )
        },
        {
            name: "ACOS",
            selector: (row) => row.acos,
            cell: (e) => (
                <div className='green'>
                    {e.acos}%
                </div>
            )
        },
    
    ];
    let data = [
        {
            name: "Product A",
            status: "Cancelled",
            ad_sales: '$541,20',
            spend: '$41,20',
            acos: '14.3%'
        },
        {
            name: "Product A",
            status: "Completed",
            ad_sales: '$541,20',
            spend: '$41,20',
            acos: '14.3%'
        },
        {
            name: "Product A",
            status: "Pending",
            ad_sales: '$541,20',
            spend: '$41,20',
            acos: '14.3%'
        },
        {
            name: "Product A",
            status: "Cancelled",
            ad_sales: '$541,20',
            spend: '$41,20',
            acos: '14.3%'
        },
        {
            name: "Product A",
            status: "Completed",
            ad_sales: '$541,20',
            spend: '$41,20',
            acos: '14.3%'
        },
    ]
    return (
        <>
            <div className='data_content'>
                <h5>Advertising by Channel</h5>
                <div className='data_table'>
                    <DataTable
                        className='table_content'
                        columns={columns}
                        striped={true}
                        data={data}
                        pagination
                        fixedHeader

                    />
                </div>
            </div>
        </>

    )
}

export default Advertis