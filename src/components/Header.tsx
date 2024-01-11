'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useWatchers } from '@azuro-org/sdk'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConfig } from 'wagmi'


export function Header() {
  // required watchers to have actual events statutes and odds,
  // must be always enabled, so we make it in the top level component
  useWatchers()

  const config = useConfig()

  // re-connect to user wallet after page reload
  useEffect(() => {
    ;(async () => {
      try {
        await config.autoConnect()
      }
      catch {}
    })()
  }, [])

  return (
    <header className="container flex items-center py-3.5 border-b border-zinc-200">
      <div className="text-xl font-semibold">Azuro Betting App</div>
      <div className="flex ml-10">
        <Link
          className="text-zinc-500 hover:text-black transition"
          href="/events/top"
        >
          Events
        </Link>
        <Link
          className="text-zinc-500 hover:text-black transition ml-4"
          href="/bets"
        >
          Bets History
        </Link>
      </div>
      <div className="ml-auto flex items-center">
        <ConnectButton chainStatus="none" />
      </div>
    </header>
  )
}
