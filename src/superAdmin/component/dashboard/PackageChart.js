import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Chart } from "react-google-charts"
function PackageChart({ data }) {

    const options = {
        title: "Package Wise Customers",

    }
    const [chartData, setchartData] = useState([]);
    const [label, setLabel] = useState([["Task", "Hours per Day"]]);

    useEffect(() => {

        let arr = []
        data?.map(el => {
            arr.push(
                [el.packageName, el.totalVendors]
            )
        })

        setchartData([...label, ...arr])

    }, [data]);
    return (
        <div className='piechart'>
            <Chart
                width={"100%"}
                height={"400px"}
                chartType="PieChart"
                data={chartData}
                options={options}

            />
        </div>
    )
}

export default PackageChart