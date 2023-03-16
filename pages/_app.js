import '@/styles/globals.css'
import * as ethers from 'ethers'
import { DAppProvider, Polygon, useEthers } from '@usedapp/core'
import Link from 'next/link'

const config = {
  readOnlyChainId: Polygon.chainId,
  readOnlyUrls: {
    // in this tutorial we use Ankr public RPC. It's free and has it's own limits
    // in the production version with a large number of users, we do not recommend using it
    [Polygon.chainId]: new ethers.providers.StaticJsonRpcProvider('https://rpc.ankr.com/polygon'),
  },
}

const ConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers()

  // 'account' being undefined means that user is not connected
  const title = account ? 'Disconnect' : 'Connect'
  const action = account ? deactivate : activateBrowserWallet

  return (
    <button className="button" onClick={() => action()}>{title}</button>
  )
}

const PageLayout = ({ children }) => (
  <div className="container pb-12">
    <div className="flex items-center justify-between pt-3 pb-16">
      <div className="text-lg font-semibold">Azuro Betting Website</div>
      <div className="flex space-x-8">
        <Link className="text-md" href="/">Events</Link>
        <Link className="text-md" href="/bets-history">Bets History</Link>
      </div>
      <ConnectButton />
    </div>
    {children}
  </div>
)

export default function App({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </DAppProvider>
  )
}
