interface StatCardProps {
    title: string
    value: string
    change?: {
        value: string
        positive: boolean
    }
    icon: BoxIcon
    iconColor: string
    iconBg: string
}
const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    iconColor,
    iconBg,
}: StatCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow p-5 flex items-start">
            <div className={`p-3 rounded-lg ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
                {change && (
                    <div className="flex items-center mt-1">
                        <span
                            className={`text-sm font-medium ${change.positive ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {change.positive ? '+' : ''}
                            {change.value}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                    </div>
                )}
            </div>
        </div>
    )
}
export default StatCard
