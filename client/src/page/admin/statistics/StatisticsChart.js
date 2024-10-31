// components/StatisticsChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticsChart = ({ statistics }) => {
    const data = {
        labels: ['Khách trọ', 'Khách'],
        datasets: [
            {
                label: 'Số lượng',
                data: [
                    statistics.khachtro?.count || 0,
                    statistics.khach?.count || 0,
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)'],
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
                text: 'Thống kê số lượng Xe ra',
            },
        },
    };

    return (
        <div className="chart-container" >
            <Bar data={data} options={options} />
        </div>
    );
};

export default StatisticsChart;
