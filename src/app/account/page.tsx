import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, LogOut, User, Shield, CreditCard } from "lucide-react";

export default function AccountPage() {
    return (
        <div className="flex-1 space-y-6 p-4 sm:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Account</h1>
                <p className="text-muted-foreground">Manage your profile and settings.</p>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="person portrait" />
                        <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-xl">Satoshi</CardTitle>
                        <CardDescription>satoshi@sloth.app</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button variant="outline">Edit Profile</Button>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <ul className="divide-y divide-border">
                        <ListItem icon={User} text="Personal Information" />
                        <ListItem icon={CreditCard} text="Payment Methods" />
                        <ListItem icon={Shield} text="Security" />
                    </ul>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">For alerts and transactions</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                         <div>
                            <p className="font-medium">Face ID</p>
                            <p className="text-sm text-muted-foreground">Secure your app with biometrics</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>

            <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
            </Button>
        </div>
    );
}

function ListItem({ icon: Icon, text }: { icon: React.ElementType, text: string }) {
    return (
        <li className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{text}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </li>
    );
}
