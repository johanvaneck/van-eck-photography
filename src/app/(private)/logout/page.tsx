
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { routes } from "@/lib/routes"

export default function LogoutPage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader>
                    <h1 className="text-xl font-bold">Log out</h1>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <Alert>
                        <AlertTitle>You have been logged out.</AlertTitle>
                        <AlertDescription>We hope to see you again soon!</AlertDescription>
                    </Alert>
                    <Button asChild variant="outline">
                        <a href={routes.signIn}>Sign in again</a>
                    </Button>
                </CardContent>
            </Card>
        </main>
    )
}
