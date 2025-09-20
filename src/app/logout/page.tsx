
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { routes } from "@/lib/routes"

export default function LogoutPage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <h1 className="text-xl font-bold">Log out</h1>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p>You have been logged out.</p>
                    <Button asChild variant="outline">
                        <a href={routes.signIn}>Sign in again</a>
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
