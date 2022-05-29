import untypedChains from './chains.json'

interface Subdomains {
  address: string
  transaction: string
}

interface Networks {
  [key: string]: string | undefined
}

interface ChainImgs {
  [key: string]: string
}

const defaultSubdomains = {
  address: 'address',
  transaction: 'tx'
}

export interface Chain {
  name: string
  networks: Networks
  subdomains?: Subdomains
}

export const chains: Chain[] = untypedChains

export const chainImgs: ChainImgs = {
  ethereum: 'ethereum.png',
  binance: 'binance.png',
  avalanche: 'avalanche.png',
  polygon: 'polygon.png',
  fantom: 'fantom.png',
  vechain: 'vechain.png',
}

export default chains.map(chain => {
  if (!chain.subdomains) {
    chain.subdomains = defaultSubdomains
  }

  return chain
})
