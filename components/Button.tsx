'use client';

import Link from 'next/link';
import React, { ButtonHTMLAttributes, ComponentProps, ReactNode } from 'react';
import { Variant } from '@/types';
import { cn } from '@/lib/utils';

const Child = ({ icon }: any) => (
    <span className="flex items-center justify-center gap-3">
        <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        {!icon && 'Processing...'}
    </span>
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
    as?: 'link' | 'button';
    loading?: boolean;
    icon?: boolean;
    children: ReactNode | ReactNode[];
    className?: string;
    variant?: Variant;
} & (ComponentProps<typeof Link> | ButtonProps);

const Button = ({
    loading,
    variant,
    className,
    children,
    as = 'link',
    icon = false,
    ...rest
}: Props) => {
    const variantClasses = {
        primary:
            'bg-black text-white border-2 border-black hover:bg-white hover:text-black',
        secondary:
            'bg-white text-black border-2 border-black hover:bg-black hover:text-white',
        danger:
            'bg-red-600 text-white border-2 border-red-600 hover:bg-white hover:text-red-600',
        light:
            'bg-[#f4f4f4] text-black border-2 border-black hover:bg-black hover:text-white',
        dark:
            'bg-black text-white border-2 border-black hover:bg-white hover:text-black',
        info:
            'bg-blue-500 text-white border-2 border-blue-500 hover:bg-white hover:text-blue-500',
        success:
            'bg-green-500 text-white border-2 border-green-500 hover:bg-white hover:text-green-500',
        warning:
            'bg-yellow-400 text-black border-2 border-yellow-400 hover:bg-white hover:text-yellow-400',
        link: 'text-black underline hover:text-primary',
        'no-color': '',
    }[variant || 'primary'];

    const buttonClasses = cn(
        `relative group font-anton uppercase tracking-widest inline-flex items-center justify-center gap-2 px-8 h-12 text-lg 
     transition-all duration-300 select-none
     before:absolute before:inset-0 before:scale-x-0 before:origin-left before:bg-primary before:transition-transform before:duration-300 before:z-0
     hover:before:scale-x-100`,
        variantClasses,
        'overflow-hidden rounded-sm', // pixel-block style
        className
    );

    const content = (
        <span className="relative z-10">
            {loading ? <Child icon={icon} /> : children}
        </span>
    );

    if (as === 'link') {
        const props = rest as ComponentProps<typeof Link>;
        return (
            <Link className={buttonClasses} {...props} href={props.href || '#'}>
                {content}
            </Link>
        );
    } else {
        const props = rest as ButtonProps;
        return (
            <button className={buttonClasses} {...props}>
                {content}
            </button>
        );
    }
};

export default Button;
