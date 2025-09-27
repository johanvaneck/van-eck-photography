import React from "react";

export default function WebsitePriceListSection({ priceList }: { priceList: Array<{ id: string; title: string; description?: string | null; price: number }> }) {
    if (!priceList || priceList.length === 0) return null;
    return (
        <section className="max-w-4xl mx-auto w-full mt-16 mb-24 px-4">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Price List</h2>
            <ul className="space-y-4">
                {priceList.map(item => (
                    <li key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-neutral-200">
                        <div>
                            <div className="font-semibold text-lg text-neutral-900">{item.title}</div>
                            {item.description && (
                                <div className="text-neutral-600 text-sm mt-1">{item.description}</div>
                            )}
                        </div>
                        <div className="mt-2 md:mt-0 font-bold text-primary text-lg md:text-right">R {item.price / 100}</div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
