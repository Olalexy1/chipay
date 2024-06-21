'use client';

import React, { useEffect, useState } from 'react'
import CustomInput from '@/components/customInput';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from '@/components/Button';
import { Form } from "@/components/ui/form";
import { updatePersonalInfoFormSchema, showToast } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { updateUserInformation } from '@/lib/actions/user.actions';


const PersonalForm = ({ user }: { user: LoggedInUserProps }) => {

    const [isLoading, setIsLoading] = useState(false);

    // console.log(user, " see user in personal forms")

    const personalFormSchema = updatePersonalInfoFormSchema();

    const personalForm = useForm<z.infer<typeof personalFormSchema>>({
        resolver: zodResolver(personalFormSchema),
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address1: user.address1,
            city: user.city,
            state: user.state,
            postalCode: user.postalCode,
            phoneNumber: user.phoneNumber
        },
    })

    useEffect(() => {
        personalForm.reset(undefined,{ keepDirtyValues: true
        })
    }, [personalForm, personalForm.formState.isSubmitSuccessful])

    const onSubmit = async (data: z.infer<typeof personalFormSchema>) => {
        setIsLoading(true);

        try {

            const userData = {
                address1: data.address1! || user.address1,
                city: data.city! || user.city,
                state: data.state! || user.state,
                postalCode: data.postalCode! || user.postalCode,
                documentId: user.documentId,
                phoneNumber: data.phoneNumber?.replace(/\s/g, "") || user.phoneNumber
            }


            if (data.phoneNumber) {
                const userPhone = {
                    phone: data.phoneNumber!.replace(/\s/g, "")
                }
            }

            const updateUser = await updateUserInformation(userData);

            if (updateUser.error) {
                showToast("error", `Update failed: ${updateUser.error || updateUser.error.error}`);
            } else {
                showToast("success", "Personal profile Updated");
            }

        } catch (error) {
            console.log(error);
            showToast("error", `Update failed ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className='w-full'>
            <Form {...personalForm}>
                <form onSubmit={personalForm.handleSubmit(onSubmit)} className="space-y-8">

                    <div className="flex gap-4 flex-col md:flex-row">
                        <CustomInput infoUpdateControl={personalForm.control} infoName='firstName' label="First Name" placeholder='Enter your first name' inputType='text' autoComplete="given-name" id="firsName" schemaType='info' disabled />
                        <CustomInput infoUpdateControl={personalForm.control} infoName='lastName' label="Last Name" placeholder='Enter your last name' inputType='text' autoComplete="family-name" id='lastName' schemaType='info' disabled />
                    </div>

                    <CustomInput infoUpdateControl={personalForm.control} infoName='email' label="Email" placeholder='Enter your email' disabled inputType="email" autoComplete='email' id='email' schemaType='info' />

                    <CustomInput infoUpdateControl={personalForm.control} infoName='address1' label="Address" placeholder='Enter your specific address' autoComplete='street-address' id='address1' schemaType='info' />

                    <div className="flex gap-4">
                        <CustomInput infoUpdateControl={personalForm.control} infoName='city' label="City" placeholder='Enter your city' autoComplete='on' id='city' schemaType='info' />

                        <CustomInput infoUpdateControl={personalForm.control} infoName='state' label="State" placeholder='Enter your state' autoComplete='on' id='state' schemaType='info' />
                    </div>

                    <div className="flex gap-4">
                        <CustomInput infoUpdateControl={personalForm.control} infoName='postalCode' label="Postal Code" placeholder='Example: 11101' autoComplete='section-user1 billing postal-code' id='postalCode' schemaType='info' />

                        <CustomInput infoUpdateControl={personalForm.control} infoName='phoneNumber' label="Phone Number" placeholder='Enter your phone Number' autoComplete='on' id='phoneNumber' schemaType='info' />
                    </div>

                    <div className="flex pb-10 justify-end">
                        <Button type="submit" isDisabled={isLoading || !personalForm.formState.isDirty} className="py-3">
                            {isLoading ? (
                                <div className='flex items-center space-x-1'>
                                    <Loader2 size={20} className="animate-spin" />
                                    <p className='text-[14px]'>Updating...</p>
                                </div>
                            ) : <p>Update Details</p>}
                        </Button>
                    </div>
                </form>
            </Form>
        </section>
    )
}

export default PersonalForm