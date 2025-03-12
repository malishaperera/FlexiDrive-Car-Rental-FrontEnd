import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface BarChartProps {
    carCount: number;
    customerCount: number;
    bookingCount: number;
}

const BarChart: React.FC<BarChartProps> = ({ carCount, customerCount, bookingCount }) => {
    const data = {
        labels: ['Cars', 'Customers', 'Bookings'],
        datasets: [
            {
                label: 'Counts',
                data: [carCount, customerCount, bookingCount],
                backgroundColor: '#40b6f0',
                borderColor: '#252828',
                borderWidth: 1,
            },
        ],
    };

    const options: {
        responsive: boolean;
        plugins: {
            legend: {
                position: 'top' | 'right' | 'bottom' | 'left' | 'center' | 'chartArea';
            };
        };
    } = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default BarChart;
