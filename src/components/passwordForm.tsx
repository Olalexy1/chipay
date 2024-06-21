'use client';

import React, { useState, useRef, useEffect } from 'react'
import CustomInput from '@/components/customInput';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from '@/components/Button';
import { Form } from "@/components/ui/form";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { updatePasswordSchema, showToast, encryptId } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { } from '@/lib/actions/user.actions';

const PasswordForm = ({ user }: { user: LoggedInUserProps }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const [showOld, setShowOld] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClickTwo = () => setShowTwo(!showTwo);
    const handleClickOld = () => setShowOld(!showOld);

    const passwordFormSchema = updatePasswordSchema();

    const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
        resolver: zodResolver(passwordFormSchema),
        // defaultValues: {
        //     oldPassword: '',
        //     password: '',
        //     confirmPassword: ''
        // },
    })

    const onSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
        setIsLoading(true);

        try {

            const userData = {
                oldPassword: data.oldPassword!,
                password: data.password!,
                // oldPassword: encryptId(data.oldPassword!),
                // password: encryptId(data.password!)
            }

            console.log(userData, 'See  Password Update Data')

            showToast("success", "Personal profile Updated");

            // const updateUser = await signUp(userData);

            // console.log(updateUser, 'See New Data')

            // if (updateUser.error) {
            //   showToast("error", `Update failed: ${updateUser.error || updateUser.error.error}`);
            // } else {
            //   showToast("success", "Personal profile Updated");
            // }

        } catch (error) {
            console.log(error);
            showToast("error", `Update failed ${error}`);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <section className='w-full'>
            <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onSubmit)} className="space-y-8">

                    <CustomInput
                        passwordUpdateControl={passwordForm.control}
                        passwordName='oldPassword'
                        label="Current Password"
                        placeholder='Enter current password'
                        inputType={showOld ? 'text' : 'password'}
                        id='oldPassword'
                        rightIcon={showOld ? <FaEye /> : <FaEyeSlash />}
                        onRightIconClick={handleClickOld}
                        schemaType='password'
                    />

                    <CustomInput
                        passwordUpdateControl={passwordForm.control}
                        passwordName='password'
                        label="New Password"
                        placeholder='Enter new password'
                        inputType={show ? 'text' : 'password'}
                        id='password'
                        rightIcon={show ? <FaEye /> : <FaEyeSlash />}
                        onRightIconClick={handleClick}
                        schemaType='password'
                    />

                    <CustomInput
                        passwordUpdateControl={passwordForm.control}
                        passwordName='confirmPassword'
                        label="Confirm New Password" placeholder='Confirm new password'
                        inputType={showTwo ? 'text' : 'password'}
                        id='confirmPassword'
                        rightIcon={showTwo ? <FaEye /> : <FaEyeSlash />}
                        onRightIconClick={handleClickTwo}
                        schemaType='password'
                    />

                    <div className="flex pb-10 justify-end">
                        <Button type="submit" isDisabled={isLoading} className="py-3">
                            {isLoading ? (
                                <div className='flex items-center space-x-1'>
                                    <Loader2 size={20} className="animate-spin" />
                                    <p className='text-[14px]'>Updating...</p>
                                </div>
                            ) : <p>Update Password</p>}
                        </Button>
                    </div>

                </form>
            </Form>

        </section>
    )
}

export default PasswordForm