
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

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
                    <Badge variant="outline" className="mt-2">Pro</Badge>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="profile" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value="John Doe" disabled className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value="john@example.com" disabled className="mt-1" />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="security">
                            <div className="space-y-4">
                                <Label>Password</Label>
                                <Input type="password" value="••••••••" disabled className="mt-1" />
                                <Badge variant="secondary">Change password</Badge>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </main>
    )
}
