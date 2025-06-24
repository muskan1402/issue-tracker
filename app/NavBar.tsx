    'use client';
    import React from 'react'
    import { AiFillBug } from 'react-icons/ai'
    import Link from 'next/link'  
    import classNames from 'classnames';
    import { usePathname } from 'next/navigation';

    const NavBar = () => {
        const currentPath = usePathname();
        const links = [
            { label: 'Dashboard', href: '/' },
            { label: 'Issues', href: '/issues' },
        ];

        return (
            <nav className="flex border-b space-x-6 mb-5 px-8 h-14  items-center bg-violet-200">
                <div className='mr-6'><Link href="/">
                    <AiFillBug className="text-2xl" /> {/* Added class for proper icon styling */}
                </Link>
                </div>
                <ul className= 'flex gap-x-6'>
                    {links.map(link => 
                        <Link key={link.href}
                        className ={classNames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-zinc-800': true,
                        })}
                        href={link.href}>{link.label}
                        </Link>
                    )}
                </ul>
            </nav>
        );
    }

    export default NavBar;
