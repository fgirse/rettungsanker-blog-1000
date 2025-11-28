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
    <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link href="/" className="inline-flex flex-col items-center justify-center p-4 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
            <span className="sr-only">Home</span>
        </Link>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-bookmark" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/></svg>
            <span className="sr-only">Bookmark</span>
        </button>
        <div id="tooltip-bookmark" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Bookmark
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-post" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/></svg>
            <span className="sr-only">New post</span>
        </button>
        <div id="tooltip-post" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            New post
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-search" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            <span className="sr-only">Search</span>
        </button>
        <div id="tooltip-search" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Search
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center p-4 hover:bg-neutral-secondary-medium group">
            <svg className="w-6 h-6 mb-1 text-body group-hover:text-fg-brand" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/></svg>
            <span className="sr-only">Settings</span>
        </button>
        <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip">
            Settings
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>
</nav>

  )
}

export default BottomNavigation
