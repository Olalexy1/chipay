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
import SelectInput from "./customDropdown";
import { wallets } from "@/constants";
import { transferToChiMoneyWallets, transferToOtherUsers } from "@/lib/actions/chimoney.actions";
import Modal from './Modal';
import SearchableSelect from './searchableDropdown';

const PaymentTransferForm = ({ subAccountId, type, allSubAccounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    console.log('I am clicked')
    setShowModal(!showModal);
  };

  const allSubAccountsData = allSubAccounts!

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

      if (type === 'transfer') {
        // create transfer transaction
        const transactionData = {
          subAccount: subAccountId!,
          receiver: data.receiver!,
          wallet: data.wallet!,
          valueInUSD: data.valueInUSD!,
        };

        // setShowModal(true)

        const payment = await transferToChiMoneyWallets(transactionData)

        if (payment.data.status === 'error') {
          showToast("error", `Transfer failed: ${payment.data.error}`);
        } else {
          showToast("success", "Transfer successful");
          form.reset();
          router.push('/dashboard');
        }
      }

      if (type === "transferToOtherUsers") {
        // create transfer transaction
        const transactionData = {
          subAccount: subAccountId!,
          email: data.payerEmail,
          // phone: data.phoneNumber,
          valueInUSD: data.valueInUSD!,
          // amount: data.amount!,
          currency: data.currency,
        };

        // setShowModal(true)

        const payment = await transferToOtherUsers(transactionData)

        if (payment.data.status === 'error') {
          showToast("error", `Transfer failed: ${payment.data.error}`);
        } else {
          showToast("success", "Transfer successful");
          form.reset();
          router.push('/dashboard');
        }
      }

    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 pb-5 mb-2">

          {type === 'transfer' && (
            <div className="flex gap-4 justify-center">
              <SearchableSelect control={form.control} name="receiver" label="ChiMoney User" placeholder="Select a receiver" id="receiver" emptyState="No Receiver Account found." data={allSubAccountsData} form={form} />

              <SelectInput control={form.control} name="wallet" label="Wallet" placeholder="Select a wallet" data={wallets} id="wallet" />
            </div>
          )}

          {type === 'transferToOtherUsers' && (
            <CustomInput control={form.control} name='receiverEmail' label="Receiver Email" placeholder='Enter receiver email Address' inputType="email" autoComplete='email' id='receiverEmail' />
          )}

          {type === 'transferToOtherUsers' && (
            <CustomInput control={form.control} name='phoneNumber' label="Receiver Phone Number" placeholder='Enter receiver phone number' inputType='tel' id='phoneNumber' />
          )}

          <CustomInput control={form.control} name='valueInUSD' label="Amount In USD" placeholder='Enter amount in USD' inputType='number' id='valueInUsd' />

          {type === 'transferToOtherUsers' && (
            <CustomInput control={form.control} name='currency' label="Currency" placeholder='ISO Currency String like CAD, USD etc.' inputType='text' id='currency' />
          )}

          <div className="payment-transfer_btn-box">
            <Button type="submit" className="payment-transfer_btn" isDisabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center space-x-1'>
                  <Loader2 size={20} className="animate-spin" />
                  <p className='text-[14px]'>Sending...</p>
                </div>
              ) : (
                "Transfer Funds"
              )}
            </Button>
          </div>
        </form>
      </Form>
      {/* <Modal modalOpen={showModal} modalClose={toggleModal}/> */}
    </>
  );
};

export default PaymentTransferForm;
