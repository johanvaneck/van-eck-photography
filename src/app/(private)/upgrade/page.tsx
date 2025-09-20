
// Card imports removed
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UpgradePage() {
    return (
        <main className="flex flex-col items-center min-h-[60vh] w-full max-w-md mx-auto py-8">
            <h1 className="text-xl font-bold mb-2 text-center">Upgrade to Pro</h1>
            <p className="text-muted-foreground mb-6 text-center">Unlock advanced features and priority support.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <Card className="flex flex-col items-center p-6">
                    <Badge variant="outline" className="mb-2">Pro</Badge>
                    <div className="text-2xl font-bold">$19/month</div>
                    <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left">
                        <li>Unlimited shoots</li>
                        <li>Team sharing</li>
                        <li>Priority support</li>
                    </ul>
                    <Button variant="default">Upgrade</Button>
                </Card>
                <Card className="flex flex-col items-center p-6">
                    <Badge variant="secondary" className="mb-2">Free</Badge>
                    <div className="text-2xl font-bold">$0/month</div>
                    <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left">
                        <li>Up to 3 shoots/month</li>
                        <li>Basic support</li>
                    </ul>
                    <Button variant="outline">Stay Free</Button>
                </Card>
            </div>
        </main>
    )
}
