// File: quick-chart.tsx
// Description: This file contains the ProfitChart component, which is responsible for rendering
// the quick insight's chart. Chart config can be found below in the variable chartOptions.

import React from 'react';
import {useColorMode} from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { Revenue } from '../data/transactions';

interface ProfitChartProps {
    revenueList: Revenue[]
}

const ProfitChart = (props : ProfitChartProps) => {
    const { revenueList } = props;
    const { colorMode } = useColorMode();


    const chartOptions = {
      chart: {
        fontFamily: 'Jost, sans-serif', // Specify the font family with fallback 
        background: 'transparent',
      },
      tooltip: {
        theme: colorMode === 'light' ? 'light' : 'dark',
        style: {
          fontSize: '14px',
        },
      },
      colors: [colorMode === 'light' ? '#68D391' : '#8BC34A'],
      xaxis: {
        categories: revenueList.map((revenue) => revenue.date?.toLocaleDateString() ?? ''),
        title: {
          
          text: 'Months',
          style: {
            color: colorMode === 'light' ? 'black' : 'white',
            fontSize: '14px',
          },
        },
        labels: {
          show: !(window.innerWidth <= 480),
          style: {
            colors: colorMode === 'light' ? 'black' : 'white',
            fontSize: '14px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Profits',
          style: {
            color: colorMode === 'light' ? 'black' : 'white',
            fontSize: '14px',
          },
        },
        labels: {
          show:  !(window.innerWidth <= 480),
          style: {
            colors: colorMode === 'light' ? 'black' : 'white',
            fontSize: '14px',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 5,
      },
      responsive: [
        {
          breakpoint: 480, // Not sure if this works to change the chart on mobile
          options: {
            chart: {
              height: 300, // Supposedly adjust the height for smaller screens
            },
          },
        },
      ],
      maintainAspectRatio: false, 
    };
    const data = revenueList.map((revenue) => {
        if (revenue.type == "revenue") {
            return revenue.amount
        } else {
            return revenue.amount*-1
        }
    })
    const series = [
      {
        name: 'Profits Over Time',
        data: data,
      },
    ];

    return (
      <main>
            <Chart options={chartOptions} series={series} type="line" height={450} />
      </main>
    
    );
  };
  
  export default ProfitChart;