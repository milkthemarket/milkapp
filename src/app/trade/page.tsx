import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TradePage() {
    return (
        <div className="flex-1 space-y-6 p-4 sm:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Trade</h1>
                <p className="text-muted-foreground">Buy and sell assets.</p>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Trade Interface</CardTitle>
                    <CardDescription>The trading interface will be available here soon.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
