
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UpgradePage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <h1 className="text-xl font-bold">Upgrade to Pro</h1>
                    <p className="text-muted-foreground mt-2">Unlock advanced features and priority support.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="border rounded-lg p-4 flex flex-col items-center">
                        <div className="text-2xl font-bold">Pro</div>
                        <div className="text-lg">$19/month</div>
                        <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left">
                            <li>Unlimited shoots</li>
                            <li>Team sharing</li>
                            <li>Priority support</li>
                        </ul>
                        <Button variant="default">Upgrade</Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
