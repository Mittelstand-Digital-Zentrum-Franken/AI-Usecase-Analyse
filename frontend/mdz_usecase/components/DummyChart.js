// components/ImplementationValueChart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ImplementationValueChart = ({ useCases }) => {
  const colors = ['rgba(75, 192, 192, 0.2)', 'rgba(192, 75, 75, 0.2)']; // Define alternating colors
  const borderColors = ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)']; // Define border colors

  const data = {
    datasets: [
      {
        data: useCases?.map((useCase) => ({
          x: useCase.implementation_score,
          y: useCase.value_score,
          name: useCase.name, // Add name property
        })),
        backgroundColor: useCases?.map((useCase) => useCase.bigRisk ? colors[1] : colors[0]),
        borderColor: 'black',
        pointBorderColor: useCases?.map((useCase) => useCase.bigRisk ? borderColors[1] : borderColors[0]),
        pointRadius: 6, // Increase the size of the points
        pointHoverRadius: 8, // Increase the size of the points on hover
        pointBorderWidth: 2, // Add black outline
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Implementation',
          color: '#000',
        },
        ticks: {
          color: '#000',
        },
        grid: {
          color: (context) => {
            if (context.tick.value === 0) {
              return 'rgba(0, 0, 0, .25)';
            }
            return 'rgba(0, 0, 0, 0.1)';
          },
          lineWidth: 1,
        },
        min: 0, // Ensure the x-axis starts at 0
      },
      y: {
        title: {
          display: true,
          text: 'Value',
          color: '#000',
        },
        ticks: {
          color: '#000',
        },
        grid: {
          color: (context) => {
            if (context.tick.value === 0) {
              return 'rgba(0, 0, 0, .25)';
            }
            return 'rgba(0, 0, 0, 0.1)';
          },
          lineWidth: 1,
        },
        min: 0, // Ensure the y-axis starts at 0
      },
    },
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const { x, y, name } = context.raw;
            var labelText = [`${name}`]
            labelText.push(`Implementation: ${x}`)
            labelText.push(`Value: ${y}`)
            return labelText;
          },
        },
      },
      verticalAndHorizontalLinePlugin: {
        id: 'verticalAndHorizontalLine',
        beforeDraw: (chart) => {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;
          const middleX = xAxis.getPixelForValue((xAxis.max + xAxis.min) / 2);
          const middleY = yAxis.getPixelForValue((yAxis.max + yAxis.min) / 2);

          ctx.save();

          // Draw background colors
          ctx.fillStyle = 'rgba(144, 238, 144, 0.3)'; // Light green
          ctx.fillRect(middleX, yAxis.top, xAxis.right - middleX, middleY - yAxis.top);

          ctx.fillStyle = 'rgba(255, 99, 71, 0.3)'; // Light red
          ctx.fillRect(xAxis.left, middleY, middleX - xAxis.left, yAxis.bottom - middleY);

          ctx.fillStyle = 'rgba(255, 165, 0, 0.3)'; // Light orange for top left
          ctx.fillRect(xAxis.left, yAxis.top, middleX - xAxis.left, middleY - yAxis.top);

          ctx.fillStyle = 'rgba(255, 165, 0, 0.3)'; // Light orange for bottom right
          ctx.fillRect(middleX, middleY, xAxis.right - middleX, yAxis.bottom - middleY);

          ctx.restore();
        },
        afterDraw: (chart) => {
          const ctx = chart.ctx;
          const xAxis = chart.scales.x;
          const yAxis = chart.scales.y;
          const middleX = xAxis.getPixelForValue((xAxis.max + xAxis.min) / 2);
          const middleY = yAxis.getPixelForValue((yAxis.max + yAxis.min) / 2);

          ctx.save();

          // Draw vertical line
          ctx.beginPath();
          ctx.moveTo(middleX, yAxis.top);
          ctx.lineTo(middleX, yAxis.bottom);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.stroke();

          // Draw horizontal line
          ctx.beginPath();
          ctx.moveTo(xAxis.left, middleY);
          ctx.lineTo(xAxis.right, middleY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.stroke();

          ctx.restore();
        },
      },
    },
  };

  return <Scatter data={data} options={options} plugins={[options.plugins.verticalAndHorizontalLinePlugin]} />;
};

export default ImplementationValueChart;
