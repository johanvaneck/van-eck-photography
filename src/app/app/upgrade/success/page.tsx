import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpgradeSuccessPage() {
    return (
        <main className="flex flex-col items-center min-h-[60vh] w-full max-w-2xl mx-auto pt-16 pb-8 px-4">
            <Card className="flex flex-col items-center p-8 w-full h-full gap-4">
                <Badge variant="default" className="mb-2 text-base px-4 py-1 bg-primary text-white">
                    Success
                </Badge>
                <h1 className="text-3xl font-extrabold text-primary mb-2 text-center">Upgrade Complete!</h1>
                <p className="text-muted-foreground text-center mb-4">
                    Thank you for upgrading. Your new features are now unlocked and ready to use.
                </p>
                <Button asChild variant="default" size="lg" className="w-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </Card>
        </main>
    );
}
