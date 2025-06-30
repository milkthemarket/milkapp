import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const activities = [
    { type: 'Buy', asset: 'Bitcoin', amount: '0.5 BTC', date: '2 days ago', change: '+' },
    { type: 'Sell', asset: 'Ethereum', amount: '10 ETH', date: '3 days ago', change: '-' },
    { type: 'Deposit', asset: 'USD', amount: '$10,000.00', date: '6 days ago', change: '+' },
    { type: 'Buy', asset: 'Solana', amount: '100 SOL', date: '1 week ago', change: '+' },
    { type: 'Withdrawal', asset: 'USD', amount: '$5,000.00', date: '1 week ago', change: '-' },
]

export default function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of your recent transactions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{activity.type} {activity.asset}</p>
                                <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                            <p className="font-mono text-right">
                                {activity.change}{activity.amount}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
