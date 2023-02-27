import { ConfigParams } from "./types";

export { ERC20Service } from "./erc20/erc.service"
import { TransactionService } from "./transaction/transaction.service";
import { Config } from "./common/config";
export { NftService } from "./nft/nft.service";
export { AuthService } from "./auth/auth.service";
export { tryRegisterSW } from "./auth/tryRegisterSW";


//export * from "./auth"
export type { Nft } from "./nft/types";

export { TransactionService } from "./transaction/transaction.service";
export { DebridgeSwapProvider as SwapService } from "./swap/debridge/debridgeSwapProvider";

export function setup(config: ConfigParams) {
  Config.ALCHEMY_API_KEY = config.alchemyApiKey!;
  Config.ETHERSCAN_API_KEY = config.etherscanApiKey!;
  Config.INFURA_PROJECT_ID = config.infuraProjectId!;
  Config.POCKET_NETWORK_APPLICATION_ID = config.pocketNetworkApplicationID!;
  Config.QUORUM = config.quorum!;
  Config.SLOW_GAS_PRICE_MULTIPLIER = config.slowGasPriceMultiplier!;
  Config.AVERAGE_GAS_PRICE_MULTIPLIER = config.averageGasPriceMultiplier!;
  Config.FAST_GAS_PRICE_MULTIPLIER = config.fastGasPriceMultiplier!;
  Config.GAS_LIMIT_MARGIN = config.gasLimitMargin!;
}

export const transferEther = TransactionService.transfer;

