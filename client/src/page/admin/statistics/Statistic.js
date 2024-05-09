import React, { useState, useEffect } from 'react'
import AdminHeader from '../components/Header'
import ContentMenu from '../components/ContentMenu'
import { apiMotelsRead } from '../../../axios/axios'
import { Pie } from 'react-chartjs-2'
import '../../../assets/scss/admin/Bill.scss'


export default function Statistic() {
    useEffect(() => {
        createPieCharts();
    }, []);

    const sliceSize = (dataNum, dataTotal) => {
        return (dataNum / dataTotal) * 360;
    }

    const addSlice = (sliceSize, pieElement, offset, sliceID, color) => {
        return (
            <div className={'slice ' + sliceID}>
                <span></span>
            </div>
        )
    }

    const iterateSlices = (sliceSize, pieElement, offset, dataCount, sliceCount, color) => {
        const maxSize = 179;
        const sliceID = 's' + dataCount + '-' + sliceCount;

        if (sliceSize <= maxSize) {
            return addSlice(sliceSize, pieElement, offset, sliceID, color);
        } else {
            const slice = addSlice(maxSize, pieElement, offset, sliceID, color);
            iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
            return slice;
        }
    }

    const createPie = (id) => {
        const listData = [];
        let listTotal = 0;
        let offset = 0;
        let i = 0;
        const pieElement = id + ' .pie-chart__pie';
        const dataElement = id + ' .pie-chart__legend';

        let color = [
            'cornflowerblue',
            'olivedrab',
            'orange',
            'tomato',
            'crimson',
            'purple',
            'turquoise',
            'forestgreen',
            'navy'
        ];

        color = shuffle(color);

        document.querySelectorAll(dataElement + ' span').forEach((element) => {
            listData.push(Number(element.innerHTML));
        });

        listData.forEach((data) => {
            listTotal += data;
        });

        listData.forEach((data, i) => {
            const size = sliceSize(data, listTotal);
            const slice = iterateSlices(size, pieElement, offset, i, 0, color[i]);
            document.querySelector(dataElement + ' li:nth-child(' + (i + 1) + ')').style.borderColor = color[i];
            offset += size;
        });
    }

    const shuffle = (a) => {
        for (let i = a.length; i; i--) {
            const j = Math.floor(Math.random() * i);
            const x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }

        return a;
    }

    const createPieCharts = () => {
        createPie('.pieID--micro-skills');
        createPie('.pieID--categories');
        createPie('.pieID--operations');
    }
    return (
        <div className='content-reponse'>
            <div className='wrapper-ee'>
                <AdminHeader />
                <div class="container-fluid">
                    <div class="row">
                        <ContentMenu />
                        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 class="h4 ms-4">Thống kê doanh thu</h1>
                            </div>
                            <div className='bg-light'>
                                {/* <Pie data={data} /> */}
                            </div>
                            <div class="wrapper">
                                <h1>Answered Questions</h1>
                                <div class="pie-charts">
                                    <div class="pieID--micro-skills pie-chart--wrapper">
                                        <h2>Micro-Skills</h2>
                                        <div class="pie-chart">
                                            <div class="pie-chart__pie"></div>
                                            <ul class="pie-chart__legend">
                                                <li><em>Additive</em><span>642</span></li>
                                                <li><em>Multiplicative</em><span>358</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pieID--categories pie-chart--wrapper">
                                        <h2>Categories</h2>
                                        <div class="pie-chart">
                                            <div class="pie-chart__pie"></div>
                                            <ul class="pie-chart__legend">
                                                <li><em>Horizontal</em><span>768</span></li>
                                                <li><em>Vertical</em><span>232</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pieID--operations pie-chart--wrapper">
                                        <h2>Operations</h2>
                                        <div class="pie-chart">
                                            <div class="pie-chart__pie"></div>
                                            <ul class="pie-chart__legend">
                                                <li><em>Addition</em><span>486</span></li>
                                                <li><em>Subtraction</em><span>156</span></li>
                                                <li><em>Multiplication</em><span>215</span></li>
                                                <li><em>Division</em><span>143</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}