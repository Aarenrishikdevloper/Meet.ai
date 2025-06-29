'use client'
import { useIsMobile } from '@/hooks/use-mobile'
import React, { ReactNode } from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
interface ResponsiveDialog {
    title: string,
    description: string,
    children: ReactNode,
    open: boolean,
    onOpenChange: (open: boolean) => void
}
const ResponsiveDialog = ({ title, description, children, open, onOpenChange }: ResponsiveDialog) => {
    const isMobile = useIsMobile()
    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerTrigger>Open</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className=" p-4">{children}</div>
                </DrawerContent>
            </Drawer>

        )
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default ResponsiveDialog