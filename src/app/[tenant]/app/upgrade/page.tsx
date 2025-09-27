import { YocoCheckoutButton } from "./components/yoco-checkout-button";
import { createYocoCheckout } from "@/app/[tenant]/actions/checkout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function UpgradePage() {
  return (
    <main className="flex flex-col items-center min-h-[60vh] w-full max-w-5xl mx-auto pt-16 pb-8 px-4">
      <h1
        className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
      >
        Upgrade Your Workflow
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <Card className="flex flex-col items-center p-8 w-full h-full">
          <Badge variant="secondary" className="mb-2">
            Free
          </Badge>
          <div className="text-2xl font-bold">$0/month</div>
          <ul className="text-sm mt-2 mb-4 list-disc list-inside text-left flex-grow">
            <li>Up to 3 shoots/month</li>
            <li>Basic support</li>
          </ul>
        </Card>
        <Card className="flex flex-col items-center p-8 border-4 border-primary bg-gradient-to-br from-primary/10 to-white shadow-2xl relative w-full h-full scale-105">
          <span className="absolute top-4 left-4 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded shadow">Most Popular</span>
          <span className="absolute top-4 right-4 text-yellow-500 text-lg font-bold">★</span>
          <Badge
            variant="default"
            className="mb-2 text-base px-4 py-1 bg-primary text-white"
          >
            Pro
          </Badge>
          <div className="text-3xl font-extrabold text-primary mb-2">
            $19<span className="text-lg font-normal">/month</span>
          </div>
          <div className="mb-2 text-sm text-center text-primary font-semibold">Boost your bookings and save hours every week!</div>
          <ul className="text-base mt-2 mb-4 list-disc list-inside text-left flex-grow">
            <li>
              <span className="font-semibold">Unlimited shoots</span>
            </li>
            <li>
              <span className="font-semibold">Team sharing</span>
            </li>
            <li>
              <span className="font-semibold">Priority support</span>
            </li>
          </ul>
          <div className="mt-auto w-full flex flex-col items-center gap-2">
            <YocoCheckoutButton amount={1900} createYocoCheckoutAction={createYocoCheckout} />
            <span className="text-xs text-muted-foreground">14-day money-back guarantee</span>
          </div>
        </Card>
        <Card className="flex flex-col items-center p-8 border-2 border-blue-500 bg-gradient-to-br from-blue-100 to-white shadow relative w-full h-full">
          <span className="absolute top-4 right-4 text-blue-500 text-lg font-bold">
            🏢
          </span>
          <Badge
            variant="outline"
            className="mb-2 text-base px-4 py-1 border-blue-500 text-blue-700"
          >
            Business
          </Badge>
          <div className="text-3xl font-extrabold text-blue-700 mb-2">
            $49<span className="text-lg font-normal">/month</span>
          </div>
          <ul className="text-base mt-2 mb-4 list-disc list-inside text-left flex-grow">
            <li>
              <span className="font-semibold">Unlimited shoots</span>
            </li>
            <li>
              <span className="font-semibold">Advanced analytics</span>
            </li>
            <li>
              <span className="font-semibold">Dedicated support</span>
            </li>
            <li>
              <span className="font-semibold">Custom branding</span>
            </li>
          </ul>
          <div className="mt-auto w-full flex flex-col items-center gap-2">
            <YocoCheckoutButton amount={4900} color="business" createYocoCheckoutAction={createYocoCheckout} />
            <span className="text-xs text-muted-foreground">14-day money-back guarantee</span>
          </div>
        </Card>
      </div>
    </main>
  );
}
