"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { authFormSchema, showToast } from "@/lib/utils";
import Button from './Button';
import { Form } from "./ui/form";
import CustomInput from './customInput';
import { paymentRequest } from "@/lib/actions/chimoney.actions";
import Modal from './Modal';

const PaymentRequestForm = ({ subAccountId, type }: PaymentTransferFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        console.log('I am clicked')
        setShowModal(!showModal);
    };

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            valueInUSD: 10,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {

            // create request transaction
            const requestData: PaymentRequestProps = {
                valueInUSD: data.valueInUSD!,
                payerEmail: data.payerEmail!,
                currency: data.currency,
                amount: data.amount,
                redirect_url: data.redirect_url,
                subAccount: subAccountId!,
            };

            // setShowModal(true)

            const initiatePayment = await paymentRequest(requestData)

            if (initiatePayment.data.status === 'error') {
                showToast("error", `Request failed: ${initiatePayment.data.error}`);
            } else {
                showToast("success", "Request successful");
                form.reset();
                router.push('/dashboard');
            }

        } catch (error) {
            console.error("Submitting create request failed: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">

                    <CustomInput control={form.control} name='valueInUSD' label="Amount In USD" placeholder='Enter amount in USD' inputType='number' id='valueInUsd' />

                    <CustomInput control={form.control} name='payerEmail' label="Payer Email" placeholder='Enter payer email' inputType="email" autoComplete='email' id='payerEmail' />

                    <CustomInput control={form.control} name='currency' label="Currency" placeholder='ISO Currency String like CAD, USD etc.' inputType='text'  id='currency' />

                    <CustomInput control={form.control} name='amount' label="Amount in specified currency" placeholder='Amount in specific "currency" to collect. Required if currency.' inputType='text'  id='amount' />

                    <CustomInput control={form.control} name='redirect_url' label="Redirect URL" placeholder='url to redirect to after payment is confirmed' inputType='text' id='redirect_url' />

                    <div className="payment-transfer_btn-box">
                        <Button type="submit" className="payment-transfer_btn" isDisabled={isLoading}>
                            {isLoading ? (
                                <div className='flex items-center space-x-1'>
                                    <Loader2 size={20} className="animate-spin" />
                                    <p className='text-[14px]'>Requesting...</p>
                                </div>
                            ) : (
                                "Request Funds"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            {/* <Modal modalOpen={showModal} modalClose={toggleModal} /> */}
        </>
    );
};

export default PaymentRequestForm;