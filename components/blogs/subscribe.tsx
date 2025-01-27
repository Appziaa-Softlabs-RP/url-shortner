"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

export default function Subscribe() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: Replace with your actual API call
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast({
                title: "Subscribed!",
                description: "You've successfully subscribed to our newsletter.",
            });
            setEmail("");
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to subscribe. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="bg-slate-800 text-white overflow-hidden">
            <CardContent className="p-0 pt-3">
                <div
                    className="bg-[url('/img/newsletter.svg')] rounded-t bg-contain bg-no-repeat bg-center h-[200px] w-full"
                    role="img"
                    aria-label="Newsletter background image"
                />
                <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-semibold">
                        Stay Informed with Our Newsletter
                    </h3>
                    <p className="text-sm opacity-90">
                        Get the latest updates, articles, and insights delivered straight to your inbox.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                            />
                            <Button
                                type="submit"
                                size="lg"
                                variant="destructive"
                                className="w-full sm:w-auto transition-transform hover:scale-105"
                                disabled={isLoading}
                            >
                                {isLoading ? "Subscribing..." : "Subscribe"}
                            </Button>
                        </div>
                    </form>
                    <p className="text-xs opacity-75">
                        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
