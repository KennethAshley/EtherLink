import { showToast, Toast } from "@raycast/api";

interface Search {
  text: string
  type: string
}

export const defaultSearch: Search = { text: '', type: 'address' }

export default async (text = '', pasted?: boolean): Promise<Search> => {
  const prefix = '0x'
  let search = defaultSearch

  if (text?.startsWith(prefix)) {
    if (/^0x[0-9-a-f]{40}$/i.test(text)) {
      search.text = text

      await showToast({
        title: pasted ? 'Clipboard' : '',
        message: 'Ethereum Address'
      })
    } else if (/^0x[0-9-a-f]{64}$/i.test(text)) {
      search.text = text
      search.type = 'transaction'

      await showToast({
        title: pasted ? 'Clipboard' : '',
        message: 'Ethereum Transaction'
      })
    }
  }


  return search
}

