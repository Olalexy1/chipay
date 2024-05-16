"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { authFormSchema, decryptId, showToast } from "@/lib/utils";
import Button from './Button';
import { Form } from "./ui/form";
import CustomInput from './customInput';
import SelectInput from "./customDropdown";
import { wallets } from "@/constants";
import { transferToChiMoneyWallets } from "@/lib/actions/chimoney.actions";

const PaymentTransferForm = ({ subAccountId, accounts, type }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valueInUSD: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data, ': see form values')
    setIsLoading(true);

    try {

      // create transfer transaction
      const transactionData = {
        subAccount: subAccountId!,
        receiver: data.receiver!,
        wallet: data.wallet!,
        valueInUSD: data.valueInUSD!,
      };

      console.log('see transaction data', transactionData)

      const payment = await transferToChiMoneyWallets(transactionData)

      form.reset();
      router.push("/dashboard");

      if (payment.error) {
        showToast("error", `Transfer failed: ${payment.error}`);
      } else {
        showToast("success", "Transfer successful");
        form.reset();
        router.push('/dashboard');
      }

    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">

        <CustomInput control={form.control} name='receiver' label="ChiMoney User or Organization ID" placeholder='Enter your ChiMoney User or Organization ID' inputType='text' id="receiver" />

        <SelectInput control={form.control} name="wallet" label="Wallet" placeholder="Select a wallet" data={wallets} id="wallet" />

        <CustomInput control={form.control} name='valueInUSD' label="Amount In USD" placeholder='Enter amount in USD' inputType='number' id='valueInUsd' />

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
  );
};

export default PaymentTransferForm;
