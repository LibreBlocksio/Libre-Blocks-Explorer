import { Cell, Label, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { StakeDetailsProps } from './types';

const COLORS = ['#FF6200', '#F9B663'];

const renderColorfulLegendText = (value: string, entry: any) => {
  return <span className='text-sm font-medium text-white'>{value}</span>;
};

function CustomLabel(props: { value1: string; value2: string }) {
  return (
    <foreignObject x={90} width='160' height='160'>
      <div className='flex h-full w-full flex-col items-center justify-center text-center'>
        <div className='mt-1 text-base font-semibold'>{props.value2}</div>
        <div className='mt-0.5 text-sm text-neutral-500'>Total LIBRE</div>
      </div>
    </foreignObject>
  );
}
export default function StakeDetails({ data }: StakeDetailsProps) {
  const stakedValue = data[1]?.value || 0;
  const stringLiquidValue = data[0]?.value?.toString() || '0';
  const liquidValue = parseFloat(stringLiquidValue.split(' ')[0]);

  const totalValue = liquidValue + (data[1]?.value ? parseFloat(data[1].value.toString()) : 0);
  const formattedTotalValue = parseFloat(totalValue.toFixed(2)).toLocaleString();

  const chartData = [
    { name: data[1]?.name || 'Staked', value: stakedValue },
    { name: data[0]?.name || 'Liquid', value: liquidValue },
  ];
  /*
  console.log('Data0(Liquid) : ' + data[0].name + '-> ' + data[0].value);
  console.log('Data1(Staked) : ' + data[1].name + '-> ' + data[1].value);
*/
  return (
    <div className='w-80'>
      <h4 className='mb-4 text-xl font-semibold text-white'>Stake Details Graph</h4>
      <div className='rounded-md border border-shade-800 p-6'>
        <ResponsiveContainer width='100%' height={160}>
          <PieChart>
            <Legend
              iconType='circle'
              layout='vertical'
              verticalAlign='middle'
              align='left'
              iconSize={10}
              formatter={renderColorfulLegendText}
            />
            <Pie
              data={chartData}
              innerRadius={58}
              outerRadius={80}
              fill='#8884d8'
              paddingAngle={0}
              dataKey='value'
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke='#000' />
              ))}
              <Label
                position='center'
                content={<CustomLabel value1='0' value2={`${formattedTotalValue}`} />}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
