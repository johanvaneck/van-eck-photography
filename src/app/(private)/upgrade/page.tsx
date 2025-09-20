
// Card imports removed
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UpgradePage() {
    return (
        <main className="flex flex-col items-center min-h-[60vh] w-full max-w-5xl mx-auto py-8 px-4">
            <h1 className="text-xl font-bold mb-2 text-center">Upgrade to Pro</h1>
            <p className="text-muted-foreground mb-6 text-center">Unlock advanced features and priority support.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <Card className="flex flex-col items-center p-8 w-full h-full">
                    <Badge variant="secondary" className="mb-2">Free</Badge>
                    <div className="text-2xl font-bold">$0/month</div>
                    <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left flex-grow">
                        <li>Up to 3 shoots/month</li>
                        <li>Basic support</li>
                    </ul>
                </Card>
                <Card className="flex flex-col items-center p-8 border-2 border-primary bg-gradient-to-br from-primary/10 to-white shadow-xl relative w-full h-full">
                    <span className="absolute top-4 right-4 text-yellow-500 text-lg font-bold">★</span>
                    <Badge variant="default" className="mb-2 text-base px-4 py-1 bg-primary text-white">Pro</Badge>
                    <div className="text-3xl font-extrabold text-primary mb-2">$19<span className="text-lg font-normal">/month</span></div>
                    <ul className="text-base mt-2 mb-4 list-disc list-inside text-left flex-grow">
                        <li><span className="font-semibold">Unlimited shoots</span></li>
                        <li><span className="font-semibold">Team sharing</span></li>
                        <li><span className="font-semibold">Priority support</span></li>
                    </ul>
                    <div className="mt-auto w-full flex justify-center">
                        <Button variant="default" size="lg" className="w-full">Upgrade</Button>
                    </div>
                </Card>
                <Card className="flex flex-col items-center p-8 border-2 border-blue-500 bg-gradient-to-br from-blue-100 to-white shadow relative w-full h-full">
                    <span className="absolute top-4 right-4 text-blue-500 text-lg font-bold">🏢</span>
                    <Badge variant="outline" className="mb-2 text-base px-4 py-1 border-blue-500 text-blue-700">Business</Badge>
                    <div className="text-3xl font-extrabold text-blue-700 mb-2">$49<span className="text-lg font-normal">/month</span></div>
                    <ul className="text-base mt-2 mb-4 list-disc list-inside text-left flex-grow">
                        <li><span className="font-semibold">Unlimited shoots</span></li>
                        <li><span className="font-semibold">Advanced analytics</span></li>
                        <li><span className="font-semibold">Dedicated support</span></li>
                        <li><span className="font-semibold">Custom branding</span></li>
                    </ul>
                    <div className="mt-auto w-full flex justify-center">
                        <Button variant="default" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">Choose Business</Button>
                    </div>
                </Card>
            </div>
        </main>
    )
}
