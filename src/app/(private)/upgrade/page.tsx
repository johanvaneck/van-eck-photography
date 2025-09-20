
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"

export default function UpgradePage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <h1 className="text-xl font-bold">Upgrade to Pro</h1>
                    <p className="text-muted-foreground mt-2">Unlock advanced features and priority support.</p>
                </CardHeader>
                <CardContent>
                    <Carousel className="w-full">
                        <CarouselContent>
                            <CarouselItem className="flex flex-col items-center p-4">
                                <Badge variant="outline" className="mb-2">Pro</Badge>
                                <div className="text-2xl font-bold">$19/month</div>
                                <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left">
                                    <li>Unlimited shoots</li>
                                    <li>Team sharing</li>
                                    <li>Priority support</li>
                                </ul>
                                <Button variant="default">Upgrade</Button>
                            </CarouselItem>
                            <CarouselItem className="flex flex-col items-center p-4">
                                <Badge variant="secondary" className="mb-2">Free</Badge>
                                <div className="text-2xl font-bold">$0/month</div>
                                <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left">
                                    <li>Up to 3 shoots/month</li>
                                    <li>Basic support</li>
                                </ul>
                                <Button variant="outline">Stay Free</Button>
                            </CarouselItem>
                        </CarouselContent>
                        <div className="flex justify-between mt-4">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </CardContent>
            </Card>
        </main>
    )
}
