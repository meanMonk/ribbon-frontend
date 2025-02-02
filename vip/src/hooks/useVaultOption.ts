import { useMemo } from "react";
import { useRouteMatch } from "react-router-dom";

import {
  VaultName,
  VaultNameOptionMap,
  VaultOptions,
  VaultVersion,
  VaultList,
} from "shared/lib/constants/constants";

const useVaultOption = () => {
  const matchVersion = useRouteMatch<{ vaultSymbol: string }>(
    "/trades/:vaultSymbol"
  );
  const [vaultOption, vaultVersion] = useMemo((): [
    VaultOptions | undefined,
    VaultVersion
  ] => {
    if (
      matchVersion?.params.vaultSymbol &&
      matchVersion.params.vaultSymbol in VaultNameOptionMap &&
      VaultList.indexOf(
        VaultNameOptionMap[
          matchVersion?.params.vaultSymbol as VaultName
        ] as typeof VaultList[number]
      ) > -1
    ) {
      const vaultName =
        VaultNameOptionMap[matchVersion?.params.vaultSymbol as VaultName];
      return [vaultName, "earn"];
    }

    /** Default value */
    return [undefined, "v1"];
  }, [matchVersion]);

  return { vaultOption, vaultVersion };
};

export default useVaultOption;
