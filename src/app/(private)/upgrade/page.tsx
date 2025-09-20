
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
                <Card className="flex flex-col items-center p-6 border-2 border-primary bg-gradient-to-br from-primary/10 to-white shadow-xl relative">
                    <span className="absolute top-4 right-4 text-yellow-500 text-lg font-bold">★</span>
                    <Badge variant="default" className="mb-2 text-base px-4 py-1 bg-primary text-white">Pro</Badge>
                    <div className="text-3xl font-extrabold text-primary mb-2">$19<span className="text-lg font-normal">/month</span></div>
                    <ul className="text-base mt-2 mb-4 list-disc list-inside text-left">
                        <li><span className="font-semibold">Unlimited shoots</span></li>
                        <li><span className="font-semibold">Team sharing</span></li>
                        <li><span className="font-semibold">Priority support</span></li>
                    </ul>
                    <Button variant="default" size="lg" className="w-full mt-2">Upgrade</Button>
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
