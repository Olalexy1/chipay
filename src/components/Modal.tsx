"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import React from "react";

interface ModalProps {
    modalOpen: boolean;
    modalHandle: () => void;
    children?: React.ReactNode;
    type: "AlertDialog" | "Dialog";
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal = ({ modalOpen, modalHandle, children, type, header, footer }: ModalProps) => {


    return (
        <>
            {
                type === 'AlertDialog' && (
                    <AlertDialog open={modalOpen} onOpenChange={modalHandle}>
                        <AlertDialogPortal>
                            <AlertDialogOverlay />
                            <AlertDialogContent className="bg-white">
                                {
                                    header && (
                                        <AlertDialogHeader>
                                            {header}
                                        </AlertDialogHeader>
                                    )
                                }
                                {children}
                                {
                                    footer && (
                                        <AlertDialogFooter>
                                            {footer}
                                        </AlertDialogFooter>
                                    )
                                }

                            </AlertDialogContent>
                        </AlertDialogPortal>
                    </AlertDialog>
                )

            }

            {
                type === 'Dialog' && (
                    <Dialog open={modalOpen} onOpenChange={modalHandle}>
                        <DialogContent className="bg-white">
                            {
                                header && (
                                    <DialogHeader>
                                        {header}
                                    </DialogHeader>
                                )
                            }
                            {children}
                            {
                                footer && (
                                    <DialogFooter>
                                        {footer}
                                    </DialogFooter>
                                )
                            }
                        </DialogContent>
                    </Dialog>
                )

            }
        </>
    )
}

export default Modal;