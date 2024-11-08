'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"

export default function UnderConstructionPopup() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // Check if the popup has been closed before
        const popupClosed = Cookies.get('underConstructionPopupClosed')
        if (!popupClosed) {
            setIsOpen(true)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        // Set a cookie to remember that the popup has been closed
        // The cookie will expire after 7 days
        Cookies.set('underConstructionPopupClosed', 'true', { expires: 7 })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">We&apos;re Currently Under Construction</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center">
                    <p className="mb-4">
                        Thank you for visiting! Our website is being updated to serve you better. If you need immediate assistance, please don&apos;t hesitate to reach out to us at:
                    </p>
                    <div className="flex flex-col items-center space-y-2 mb-4">
                        <a href="mailto:info@digitaljanet.com" className="flex items-center space-x-2 text-primary hover:underline">
                            <Mail className="h-4 w-4" />
                            <span>info@digitaljanet.com</span>
                        </a>
                        <a href="tel:+16812332629" className="flex items-center space-x-2 text-primary hover:underline">
                            <Phone className="h-4 w-4" />
                            <span>+1 (681) 233 2629</span>
                        </a>
                    </div>
                    <p>We appreciate your patience and look forward to connecting with you soon!</p>
                </DialogDescription>
                <Button onClick={handleClose} className="mt-4 w-full">
                    Close
                </Button>
            </DialogContent>
        </Dialog>
    )
}