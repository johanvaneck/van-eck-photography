import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpgradeFailedPage() {
    return (
        <main className="flex flex-col items-center min-h-[60vh] w-full max-w-2xl mx-auto pt-16 pb-8 px-4">
            <Card className="flex flex-col items-center p-8 w-full h-full gap-4">
                <Badge variant="destructive" className="mb-2 text-base px-4 py-1 bg-red-500 text-white">
                    Failed
                </Badge>
                <h1 className="text-3xl font-extrabold text-red-700 mb-2 text-center">Upgrade Failed</h1>
                <p className="text-muted-foreground text-center mb-4">
                    Something went wrong with your payment. Please try again or contact support if the issue persists.
                </p>
                <Button asChild variant="default" size="lg" className="w-full">
                    <Link href="/upgrade">Try Again</Link>
                </Button>
            </Card>
        </main>
    );
}
