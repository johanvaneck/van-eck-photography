// Card imports removed
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function NotificationsPage() {
  return (
    <main className="flex flex-col items-center min-h-[60vh] w-full max-w-md mx-auto py-8">
      <h1 className="text-xl font-bold mb-6">Notifications</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Alert>
            <AlertTitle>Your subscription was renewed</AlertTitle>
            <AlertDescription>Sep 1, 2025</AlertDescription>
          </Alert>
          <Alert>
            <AlertTitle>New feature: Team sharing is now available!</AlertTitle>
            <AlertDescription>Aug 28, 2025</AlertDescription>
          </Alert>
        </TabsContent>
        <TabsContent value="updates" className="space-y-4">
          <Alert>
            <AlertTitle>New feature: Team sharing is now available!</AlertTitle>
            <AlertDescription>Aug 28, 2025</AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </main>
  );
}
