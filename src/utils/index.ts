import { showToast } from "@raycast/api";
import { utils } from 'ethers'

import { Chain } from '../chains'
import { SearchText } from '../etherlinks'

interface Search {
  text: string
  type: string
}

export const isAddress = (addy: string) => utils.isAddress(addy)
export const isTransaction = (addy: string) => /^0x[0-9-a-f]{64}$/i.test(addy)

export const defaultSearch: Search = { text: '', type: 'address' }

export const searchParser = async (text = '', pasted?: boolean): Promise<Search> => {
  const prefix = '0x'
  let search = defaultSearch

  if (text?.startsWith(prefix)) {
    if (isAddress(text)) {
      search.text = text

      await showToast({
        title: pasted ? 'Clipboard' : '',
        message: 'Address'
      })
    } else if (isTransaction(text)) {
      search.text = text
      search.type = 'transaction'

      await showToast({
        title: pasted ? 'Clipboard' : '',
        message: 'Transaction'
      })
    }
  }


  return search
}

export const urlParser = (chain: Chain, network: string, address: SearchText | undefined) => {
  const { subdomains = {}, networks } = chain

  const root = networks[network]
  const subdomain = subdomains[address?.type as keyof typeof chain.subdomains]

  return `${root}/${subdomain}/${address?.text}`
}
