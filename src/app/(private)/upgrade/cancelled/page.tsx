import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpgradeCancelledPage() {
    return (
        <main className="flex flex-col items-center min-h-[60vh] w-full max-w-2xl mx-auto pt-16 pb-8 px-4">
            <Card className="flex flex-col items-center p-8 w-full h-full gap-4">
                <Badge variant="outline" className="mb-2 text-base px-4 py-1 border-red-500 text-red-700">
                    Cancelled
                </Badge>
                <h1 className="text-3xl font-extrabold text-red-700 mb-2 text-center">Upgrade Cancelled</h1>
                <p className="text-muted-foreground text-center mb-4">
                    Your upgrade was cancelled. No changes have been made to your account.
                </p>
                <Button asChild variant="default" size="lg" className="w-full">
                    <Link href="/upgrade">Try Again</Link>
                </Button>
            </Card>
        </main>
    );
}
