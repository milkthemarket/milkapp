import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, Plus } from "lucide-react";

const alerts = [
    { id: 1, asset: 'BTC', condition: 'moves > 5%', active: true },
    { id: 2, asset: 'ETH', condition: 'is above $4,000', active: true },
    { id: 3, asset: 'DOGE', condition: 'is below $0.10', active: false },
    { id: 4, asset: 'News', condition: 'for TSLA', active: true },
];

export default function AlertsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
                    <p className="text-muted-foreground">Manage your price and news alerts.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Alert
                </Button>
            </div>
            <Card>
                <CardContent className="p-0">
                    <ul className="divide-y divide-border">
                        {alerts.map((alert) => (
                            <li key={alert.id} className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted p-3 rounded-full">
                                        <Bell className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{alert.asset} {alert.condition}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {alert.active ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                </div>
                                <Switch defaultChecked={alert.active} />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
