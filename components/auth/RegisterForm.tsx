/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { EyeIcon, Mail, User } from 'lucide-react';
import { useState } from 'react';
import Image from "next/image";
import ButtonLoader from "../shared/ButtonLoader";
import Link from "next/link";
import { userRegister } from "@/services/auth/registerUser";
import { toast } from "sonner";

export const RegisterFormSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required"),

    lastName: z
        .string()
        .min(1, "Last name is required"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
        .string()
        .min(6, "Confirm password is required"),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


const RegisterForm = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: ""
        },
    })
    async function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        setLoading(true)
        try {
            const result = await userRegister(values)
            if (result.success) {
                toast.success(result.message)
            }
        } catch (error: any) {
            toast.error(error.message || "something went wrong")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div
            className="min-h-screen w-full flex items-center bg-contain justify-end bg-left bg-no-repeat"
            style={{
                backgroundImage: "url('/registration.png')",
            }}
        >
            <div className="bg-white backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md mr-20">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={150}
                    height={40}
                    className="mx-auto"
                />
                <h3 className="text-xl text-center mt-5">Get Started Now</h3>
                <h2 className="text-2xl font-semibold text-center mb-5">Registration
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div>
                                <label className="text-slate-900 text-[15px] font-medium mb-2 block">First Name</label>
                                <div className=" flex items-center">
                                    <FormField

                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <div className='relative'>
                                                    <FormControl>
                                                        <Input placeholder="first name"  {...field} />
                                                    </FormControl>
                                                    <User className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-900 text-[15px] font-medium mb-2 block">Last Name</label>
                                <div className=" flex items-center">
                                    <FormField

                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <div className='relative'>
                                                    <FormControl>
                                                        <Input placeholder="last name"  {...field} />
                                                    </FormControl>
                                                    <User className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-900 text-[15px] font-medium mb-2 block">Email</label>
                                <div className=" flex items-center">
                                    <FormField

                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <div className='relative'>
                                                    <FormControl>
                                                        <Input placeholder="email"  {...field} />
                                                    </FormControl>
                                                    <Mail className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-900 text-[15px] font-medium mb-2 block">Password</label>
                                <div className="flex items-center">
                                    <FormField

                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <div className='relative'>
                                                    <FormControl>
                                                        <Input placeholder="password"  {...field} />
                                                    </FormControl>
                                                    <EyeIcon className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-slate-900 text-[15px] font-medium mb-2 block">Confirm Password</label>
                                <div className="flex items-center">
                                    <FormField

                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem className='w-full'>
                                                <div className='relative'>
                                                    <FormControl>
                                                        <Input placeholder="confirm password"  {...field} />
                                                    </FormControl>
                                                    <EyeIcon className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                                </div>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="mt-12">
                            {
                                loading ? <ButtonLoader /> : <Button type="submit" className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none cursor-pointer">
                                    Sign Up
                                </Button>
                            }

                        </div>

                    </form>
                </Form>
                <p className="text-sm text-gray-500 text-center mt-2">Already have an account? <Link href="/signIn" className="text-primary">LogIn</Link></p>
            </div>

        </div>
    );

};

export default RegisterForm;