import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Chart } from "react-google-charts";
function CountryChart({ data }) {
    const [chartData, setchartData] = useState([]);
    const [label, setLabel] = useState([["Country", ""]]);

    useEffect(() => {

        let arr = []
        data?.map(el => {
            arr.push(
                [el.countryName, el.totalVendors]
            )
        })

        setchartData([...label, ...arr])

    }, [data]);


    return (
        <div className='superadminChart'>
            <Chart

                height={"100%"}
                chartType="GeoChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    legend: "none",
                    sizeAxis: { minValue: 1, maxSize: 12 },
                    colorAxis: { colors: '#512888' },
                    tooltip: {
                        isHtml: true,
                        trigger: "both"
                    },
                    width: '100%',
                    height: '100%'
                }}
                rootProps={{ "data-testid": "2" }}
            />
        </div>
    )
}

export default CountryChart