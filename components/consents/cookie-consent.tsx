'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { hasCookie, setCookie } from 'cookies-next'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from '@/lib/utils'

export default function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false)
    const [showPreferences, setShowPreferences] = useState(false)
    const [activeTab, setActiveTab] = useState("your-privacy")
    const [cookiePreferences, setCookiePreferences] = useState({
        necessary: true,
        performance: true,
        functionality: true,
        targeting: true
    })

    useEffect(() => {
        if (!hasCookie('consent')) {
            setShowConsent(true)
        }
    }, [])

    const handleCookieToggle = (type: keyof typeof cookiePreferences) => {
        if (type === 'necessary') return // Cannot toggle necessary cookies
        setCookiePreferences(prev => ({ ...prev, [type]: !prev[type] }))
    }

    const acceptConsent = () => {
        setShowConsent(false)
        setShowPreferences(false)
        setCookie('consent', JSON.stringify(cookiePreferences))
        if (typeof window !== 'undefined' && (cookiePreferences.performance || cookiePreferences.targeting)) {
            window.dispatchEvent(new Event('updateGTMConsent'))
        }
    }

    const declineConsent = () => {
        setShowConsent(false)
        setShowPreferences(false)
        setCookie('consent', JSON.stringify({
            necessary: true,
            performance: false,
            functionality: false,
            targeting: false
        }))
    }

    const cookieCategories = [
        {
            id: "your-privacy",
            title: "Your Privacy",
            content: `When you visit any web site, it may store or retrieve information on your browser, mostly in the form of cookies. This information might be about you, your preferences or your device and is mostly used to make the site work as you expect it to. The information does not usually directly identify you, but it can give you a more personalised web experience. Because we respect your right to privacy, you can choose not to allow some types of cookies (except for the Strictly Necessary cookies). The Strictly Necessary cookies are always on, as they are required to keep the site functioning. Click on the different category headings to find out more and change the default settings. It is your choice to accept these or not. You can either click the 'I accept all cookies' or 'Reject all non-essential cookies' button below, or use the switches on the different cookie category headings to choose and save your choices. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.

            For detailed information on how we use cookies and other tracking technologies, please visit our Cookies Info page. For more details on how we manage your personal data, please refer to the Privacy Policy.`,
        },
        {
            id: "strictly-necessary",
            title: "Strictly Necessary Cookies",
            content: "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.",
            required: true
        },
        {
            id: "performance",
            title: "Performance Cookies",
            content: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
            required: false
        },
        {
            id: "functionality",
            title: "Functionality Cookies",
            content: "These cookies help us to understand how effective our marketing campaigns are, and enhance your online experiences with PwC with customisation.",
            required: false
        },
        {
            id: "targeting",
            title: "Marketing Cookies",
            content: "PwC may present ads to you on other sites to promote relevant services, articles or events. The cookies are used to make advertising messages more relevant to you and your interests. They also perform functions like preventing the same ad from continuously reappearing. These advertisements are solely intended to make you aware of relevant PwC promotions. PwC does not sell your data to any third parties. Please see our privacy policy for more details.",
            required: false
        }
    ]

    if (!showConsent && !showPreferences) {
        return null
    }

    const PreferencesContent = () => (
        <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
            <DialogContent className="max-w-4xl h-screen sm:h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle>Privacy Preference Center</DialogTitle>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col overflow-hidden">
                    <TabsList className="justify-center px-6 border-b flex-wrap min-h-fit">
                        {cookieCategories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id} className="data-[state=active]:bg-white m-1 sm:m-2 text-xs sm:text-sm">
                                {category.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <ScrollArea className="flex-grow max-h-[50vh]">
                        {cookieCategories.map((category) => (
                            <TabsContent key={category.id} value={category.id} className="p-6 mt-0">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">{category.title}</h3>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap mb-[200px]">{category.content}</p>
                                    {category.id !== "your-privacy" && (
                                        <div className="flex items-center justify-between pt-4">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Switch
                                                            id={category.id}
                                                            checked={category.required || cookiePreferences[category.id as keyof typeof cookiePreferences]}
                                                            onCheckedChange={() => handleCookieToggle(category.id as keyof typeof cookiePreferences)}
                                                            disabled={category.required}
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        {category.required ? "This cookie type cannot be disabled" : "Toggle this cookie type"}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <span className="text-sm font-medium">
                                                {category.required ? "Always Active" : (cookiePreferences[category.id as keyof typeof cookiePreferences] ? "Active" : "Inactive")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        ))}
                    </ScrollArea>
                </Tabs>
                <div className="border-t bg-background p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-xs text-muted-foreground">
                        <p>Reference ID: {Math.random().toString(36).substring(2, 15)}</p>
                        <p>This Reference ID will be used as a unique identifier while storing and accessing your preferences for future.</p>
                        <p>Last Cookie Consent Preferences was recorded at: {new Date().toLocaleString()}</p>
                    </div>
                    <div className="flex gird-cols-2 gap-4">
                        <Button variant="outline" onClick={declineConsent}>
                            Reject all non-essential cookies
                        </Button>
                        <Button onClick={acceptConsent}>
                            Save my preferences
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )

    return (
        <>
            {!showPreferences && (
                <div className="fixed bottom-0 md:bottom-4 left-0 md:left-4 z-50">
                    <Card className="w-full max-w-3xl p-4 shadow-lg">
                        <CardContent className="grid sm:grid-cols-[1fr_200px] items-center justify-center gap-4">
                            <p className="text-xs font-normal gap-1">
                                We use cookies to make our site work well for you and so we can continually improve it.
                                The cookies that keep the site functioning are always on. We use analytics and marketing
                                cookies to help us understand what content is of most interest and to personalise your
                                user experience. For more details on how we manage your personal data please refer to our{' '}
                                <Link href="/privacy" className="underline text-primary">
                                    privacy policy
                                </Link>.
                            </p>
                            <div className="flex flex-col gap-4 justify-between w-full p-0">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={declineConsent}
                                    className="text-[12px] text-xs w-full py-5"
                                >
                                    Decline All
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={acceptConsent}
                                    className="text-[12px] text-xs w-full py-5"
                                >
                                    Accept All
                                </Button>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setShowPreferences(true)}
                                    className="text-[12px] text-xs w-full py-5"
                                >
                                    Manage cookie settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            <PreferencesContent />
        </>
    )
}