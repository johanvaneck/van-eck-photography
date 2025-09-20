
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountPage() {
    return (
        <main className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex flex-col items-center gap-2">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="/avatar.png" alt="User avatar" />
                        <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <h1 className="text-xl font-bold">Account</h1>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value="John Doe" disabled className="mt-1" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value="john@example.com" disabled className="mt-1" />
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}
