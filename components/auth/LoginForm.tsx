/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { EyeIcon, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Link from 'next/link';
import Image from "next/image";
import { userLogin } from "@/services/auth/LoginUser";
import { toast } from "sonner";
const logninFormSchema = z.object({
    email: z.email({
        message: "email is required",
    }),
    password: z.string().min(1, "password is required")

})

const LoginForm = () => {
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const form = useForm<z.infer<typeof logninFormSchema>>({
        resolver: zodResolver(logninFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    async function onSubmit(values: z.infer<typeof logninFormSchema>) {
        try {
            const result = await userLogin(values)
            if (result.success) {
                toast.success(result.message)
            }
        } catch (error: any) {
            toast.error(error.message || "something went wrong")
        }
    }


    return (
        <div
            className="min-h-screen w-full flex items-center justify-end bg-left bg-no-repeat"
            style={{
                backgroundImage: "url('/login.png')",  // replace with your image
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
                <h3 className="text-xl text-center mt-5">Welcome back</h3>
                <h2 className="text-2xl font-semibold text-center mb-5">Login to your account
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>


                        <div className="space-y-6">
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
                            <div className="flex flex-wrap items-center justify-between gap-4">

                                <div>
                                    <Link href="/forget-password" className="text-blue-600 font-medium text-sm hover:underline">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            {
                                <Button type="submit" className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none cursor-pointer">
                                    Sign in
                                </Button>
                            }

                        </div>

                        <div className="my-4 flex items-center gap-4">
                            <hr className="w-full border-slate-300" />
                            <p className="text-sm text-slate-900 text-center">or</p>
                            <hr className="w-full border-slate-300" />
                        </div>


                    </form>


                </Form>
            </div>
        </div>
    );

};

export default LoginForm;