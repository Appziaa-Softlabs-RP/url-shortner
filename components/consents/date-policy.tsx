'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { setCookie, hasCookie } from 'cookies-next'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function DateConsent() {
    const [showConsent, setShowConsent] = useState(false)
    const [trackingEnabled, setTrackingEnabled] = useState(false)

    useEffect(() => {
        if (!hasCookie('consent')) {
            setShowConsent(true)
        }
    }, [])

    const acceptConsent = () => {
        setShowConsent(false)
        setCookie('consent', 'true')
        setCookie('tracking', trackingEnabled.toString())
        if (typeof window !== 'undefined' && trackingEnabled) {
            window.dispatchEvent(new Event('updateGTMConsent'))
        }
    }

    const declineConsent = () => {
        setShowConsent(false)
        setCookie('consent', 'false')
        setCookie('tracking', 'false')
    }

    if (!showConsent) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Cookie Consent</CardTitle>
                    <CardDescription>We value your privacy and use cookies to enhance your experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Information about cookies:</h3>
                        <p className="text-sm text-muted-foreground">
                            We use cookies on our website. Some are technically necessary, while others help us improve this website or provide additional functionalities.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Information on data transmission:</h3>
                        <p className="text-sm text-muted-foreground">
                            When displaying content from external media, data transmission and processing may occur in accordance with the data protection regulations of the respective platforms.
                        </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        For further information, please refer to our{" "}
                        <Link href="/privacy" className="underline text-primary">
                            privacy policy
                        </Link>
                        .
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Necessary Cookies</span>
                        <Switch checked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Tracking and Performance</span>
                        <Switch
                            checked={trackingEnabled}
                            onCheckedChange={setTrackingEnabled}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={declineConsent}>
                        Decline
                    </Button>
                    <Button onClick={acceptConsent}>Accept</Button>
                </CardFooter>
            </Card>
        </div>
    )
}