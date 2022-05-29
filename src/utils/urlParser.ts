import { Chain } from '../chains'
import { SearchText } from '../etherLink'

export default (chain: Chain, network: string, address: SearchText | undefined) => {
  const { subdomains = {}, networks } = chain

  const root = networks[network]
  const subdomain = subdomains[address?.type as keyof typeof chain.subdomains]

  return `${root}/${subdomain}/${address?.text}`
}
