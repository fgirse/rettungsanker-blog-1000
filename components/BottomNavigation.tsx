"use client";

import React from 'react'
import Link from 'next/link'

const BottomNavigation = () => {
  return (

<nav className="md:hidden">
<div className="fixed bottom-0 z-50 w-full -translate-x-1/2 bg-red-900 primary-soft border-t border-default left-1/2">
    <div className="w-full">
        <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-neutral-tertiary rounded-base" role="group">
            {/*<Link href="/" className="uppercase px-5 py-1.5 text-xs font-medium text-body bg-red-900 border hover:text-yellow-200 rounded inline-flex items-center justify-center">
                Home
            </Link>*/}
            <Link href="/sign-in" className="uppercase px-5 py-1.5 text-xs font-medium text-white bg-slate-400 border hover:bg-orange-400  hover:text-yellow-200 rounded inline-flex items-center justify-center">
                Anmelden
            </Link>
            <Link href="/sign-up" className="uppercase px-5 py-1.5 text-xs font-medium text-white bg-slate-600 border hover:bg-orange-400  hover:text-yellow-200 rounded inline-flex items-center justify-center">
                Registrieren
            </Link>
            
        </div>
    </div>

</div>
</nav>

  )
}

export default BottomNavigation
