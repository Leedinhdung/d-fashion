import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
interface ChartProps {
    data: Array<{
        name: string
        value: number
    }>
    title: string
    subtitle?: string
}
const Chart = ({ data, title, subtitle }: ChartProps) => {
    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 12,
                                fill: '#6B7280',
                            }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 12,
                                fill: '#6B7280',
                            }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '0.375rem',
                                boxShadow:
                                    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                                padding: '0.5rem 1rem',
                            }}
                            labelStyle={{
                                fontWeight: 600,
                                marginBottom: '0.25rem',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{
                                r: 4,
                                fill: '#3B82F6',
                                strokeWidth: 0,
                            }}
                            activeDot={{
                                r: 6,
                                fill: '#3B82F6',
                                strokeWidth: 0,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
export default Chart
