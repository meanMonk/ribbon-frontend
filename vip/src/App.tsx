import { Web3ReactProvider } from "@web3-react/core";
import { useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

import RootApp from "./components/RootApp";
import { Web3ContextProvider } from "shared/lib/hooks/web3Context";
import { getLibrary } from "shared/lib/utils/getLibrary";
import { Web3DataContextProvider } from "shared/lib/hooks/web3DataContext";
import { SubgraphDataContextProvider } from "shared/lib/hooks/subgraphDataContext";
import { PendingTransactionsContextProvider } from "shared/lib/hooks/pendingTransactionsContext";
import { ExternalAPIDataContextProvider } from "shared/lib/hooks/externalAPIDataContext";
import { ChainContextProvider } from "shared/lib/hooks/chainContext";
import "shared/lib/i18n/config";
import { StorageContextProvider } from "./hooks/useStorageContextProvider";

function App() {
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <ChainContextProvider>
      <Web3ContextProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
          <PendingTransactionsContextProvider>
            <Web3DataContextProvider>
              <SubgraphDataContextProvider>
                <ExternalAPIDataContextProvider>
                  <StorageContextProvider>
                    <RootApp />
                  </StorageContextProvider>
                </ExternalAPIDataContextProvider>
              </SubgraphDataContextProvider>
            </Web3DataContextProvider>
          </PendingTransactionsContextProvider>
        </Web3ReactProvider>
      </Web3ContextProvider>
    </ChainContextProvider>
  );
}

export default App;
