import {
  Action,
  ActionPanel,
  Clipboard,
  List,
  Toast,
  open,
  showToast,
} from "@raycast/api"

import { uniqueId, upperFirst, lowerCase } from 'lodash'
import { useState, useEffect } from 'react'
import { utils } from 'ethers'

import chains, { Chain, chainImgs } from './chains'
import searchParser from './utils/searchParser'
import urlParser from './utils/urlParser'

export interface SearchText {
  text: string
  type: string
}

export default () => {
  const [search, setSearch] = useState<SearchText | undefined>()

  useEffect(() => {
    const initWithClipboard = async () => {
      const text = await Clipboard.readText()

      if (text) {
        const search = await searchParser(text, true)

        setSearch(search)
      }
    }

    initWithClipboard()
  }, [])

  const handleSearchTextChange = async (text: string) => {
    const search = await searchParser(text)

    setSearch(search)
  }

  const handleAction = async (
    chain: Chain,
    network: string,
    search: SearchText | undefined,
  ) => {
    if (!search?.text || !utils.isAddress(search?.text)) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Invalid search string",
      })

      return
    }

    const url = urlParser(chain, network, search)

    open(url)
  }

  return (
    <List
      throttle
      searchText={search?.text}
      onSearchTextChange={handleSearchTextChange}
      searchBarPlaceholder="Search by Address / Txn Hash"
      enableFiltering={false}
      navigationTitle="EtherLink"
    >
      <List.Section title="Chains">
        { chains.map((chain => (
          <List.Item
            key={chain.name}
            title={upperFirst(chain.name)}
            icon={{
              source: chainImgs[lowerCase(chain.name)]
            }}
            actions={
              <ActionPanel title="Which network?">
                {Object.keys(chain.networks).map(network => (
                  <Action
                    key={uniqueId('action_')}
                    title={upperFirst(network)}
                    onAction={() => handleAction(chain, network, search)}
                  />
                ))}
              </ActionPanel>
            }
          />
        )))}
      </List.Section>
    </List>
  )
}
