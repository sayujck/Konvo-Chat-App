import React from 'react'
import { assests } from '../assets/assets'
import { Link } from 'react-router-dom'
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
    return (
        <div>Navbar</div>
        // <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        //     <div className="container mx-auto px-5 h-16">

        //         <div className="flex items-center justify-between h-full">
        //             <div className="flex items-center gap-8">
        //                 <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all">
        //                     <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
        //                         <img className='w-8 m-5' src={assests.logo} alt="" />
        //                     </div>
        //                     <h1 className="text-lg md:text-2xl font-bold text-amber-300">Konvo</h1>
        //                 </Link>
        //             </div>
        //             <div className="flex items-center gap-5 cursor-pointer">
        //                 <div className='flex items-center gap-2'>
        //                     <Settings className="w-4 h-4" />
        //                     <span className="hidden sm:inline">Settings</span>
        //                 </div>

        //                 <div className='flex items-center gap-2 cursor-pointer'>
        //                     <User className="size-5" />
        //                     <span className="hidden sm:inline">Profile</span>
        //                 </div>

        //                 <div>
        //                     <button className="flex gap-2 items-center cursor-pointer">
        //                         <LogOut className="size-5" />
        //                         <span className="hidden sm:inline">Logout</span>
        //                     </button>
        //                 </div>

        //             </div>

        //         </div>
        //     </div>
        // </header>
    )
}

export default Navbar