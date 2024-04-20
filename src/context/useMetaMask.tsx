'use client'

import { useState, useEffect, createContext, PropsWithChildren, useContext, useCallback } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from '@/utils/index'

interface WalletState {
  accounts: any[]
  balance: string
  chainId: string
}

interface MetaMaskContextData {
  wallet: WalletState
  hasProvider: boolean | null
  error: boolean
  errorMessage: string
  isConnecting: boolean
  connectMetaMask: () => void
  clearError: () => void
}

const disconnectedState: WalletState = {
  accounts: [],
  balance: '',
  chainId: '',
}

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData)

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')

  const [wallet, setWallet] = useState(disconnectedState)

  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const ethereum = (window as any).ethereum;
    if (!ethereum) return;

    const accounts = providedAccounts || await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length === 0) {
      setWallet(disconnectedState)
      return
    }

    const balance = formatBalance(await ethereum.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }))
    const chainId = await ethereum.request({
      method: 'eth_chainId',
    })

    setWallet({ accounts, balance, chainId })
  }, [])

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet])
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet])

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        updateWalletAndAccounts()
        provider.on('accountsChanged', updateWallet)
        provider.on('chainChanged', updateWalletAndAccounts)
      }
    }

    getProvider()

    return () => {
      const provider = (window as any).ethereum;
      if (!provider) return;
      provider.removeListener('accountsChanged', updateWallet)
      provider.removeListener('chainChanged', updateWalletAndAccounts)
    }
  }, [updateWallet, updateWalletAndAccounts])

  const connectMetaMask = async () => {
    setIsConnecting(true)

    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        throw new Error('MetaMask not installed');
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      clearError()
      updateWallet(accounts)
    } catch(err: any) {
      setErrorMessage(err.message)
    }
    setIsConnecting(false)
  }

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
  }
  return context
}
