// components/StatisticsChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartXeRa = ({ statistics }) => {
    const data = {
        labels: ['khách trọ', 'Khách'],
        datasets: [
            {
                label: 'Tổng giá tiền',
                data: [
                    statistics.khachtro?.total_money || 0,
                    statistics.khach?.total_money || 0,
                ],
                backgroundColor: ['rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(153, 102, 255, 1)'],
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê Tổng tiền Xe ra',
            },
        },
    };

    return (
        <div className="chart-container" >
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartXeRa;
