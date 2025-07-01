import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TradeForm({ action }: { action: 'Buy' | 'Sell' }) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor={`${action}-ticker`}>Ticker</Label>
                <Input id={`${action}-ticker`} placeholder="e.g. BTC, ETH, SOL" />
            </div>
            <div className="space-y-2">
                <Label htmlFor={`${action}-amount`}>Amount (USD)</Label>
                <Input id={`${action}-amount`} type="number" placeholder="100.00" />
            </div>
            <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">You will receive approx.</span>
                    <span>0.0015 BTC</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fee</span>
                    <span>$0.99</span>
                </div>
            </div>
            <Button className="w-full" size="lg">
                {action}
            </Button>
        </div>
    );
}

export default function TradePage() {
    return (
        <div className="flex-1 p-4 sm:p-6 flex justify-center items-center">
            <Tabs defaultValue="buy" className="w-full max-w-md">
                <Card className="shadow-lg">
                    <CardHeader>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="buy">Buy</TabsTrigger>
                            <TabsTrigger value="sell">Sell</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="buy">
                            <TradeForm action="Buy" />
                        </TabsContent>
                        <TabsContent value="sell">
                            <TradeForm action="Sell" />
                        </TabsContent>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Explore</Button>
                    </CardFooter>
                </Card>
            </Tabs>
        </div>
    );
}
