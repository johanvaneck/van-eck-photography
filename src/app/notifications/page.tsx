
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function NotificationsPage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <h1 className="text-xl font-bold">Notifications</h1>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="font-medium">Your subscription was renewed.</div>
                        <div className="text-xs text-muted-foreground">Sep 1, 2025</div>
                    </div>
                    <Separator />
                    <div>
                        <div className="font-medium">New feature: Team sharing is now available!</div>
                        <div className="text-xs text-muted-foreground">Aug 28, 2025</div>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
