import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExplorePage() {
    return (
        <div className="flex-1 space-y-6 p-4 sm:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Explore</h1>
                <p className="text-muted-foreground">Discover new opportunities.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Explore Section</CardTitle>
                    <CardDescription>Content for the explore page will be added here soon.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
