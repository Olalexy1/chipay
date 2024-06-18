"use client";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogOverlay,
    AlertDialogPortal
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface ModalProps {
    modalOpen?: boolean;
    modalHandle?: () => void;
    children?: React.ReactNode;
    type: "AlertDialog" | "Dialog";
}

const Modal = ({ modalOpen, modalHandle, children, type }: ModalProps) => {

    const [open, setOpen] = React.useState(false);

    const handleModalState = () => {
        setOpen(!open);
    };

    return (
        <>
            {
                type === 'AlertDialog' && (
                    <AlertDialog open={open} onOpenChange={handleModalState}>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">Show Dialog</Button>
                        </AlertDialogTrigger>
                        <button onClick={handleModalState}>Open Dialog</button>
                        <AlertDialogPortal>
                            <AlertDialogOverlay />
                            <AlertDialogContent className="bg-white">
                                {children}
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove your data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogPortal>
                    </AlertDialog>
                )

            }

            {
                type === 'Dialog' && (
                    <Dialog open={open} onOpenChange={handleModalState}>
                        {/* <DialogTrigger asChild>
                            <Button variant="outline">Share</Button>
                        </DialogTrigger> */}
                        <button onClick={handleModalState}>Open Share</button>
                        <DialogContent className="bg-white">
                            {children}
                            {/* <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter> */}
                        </DialogContent>
                    </Dialog>
                )

            }
        </>
    )
}

export default Modal;