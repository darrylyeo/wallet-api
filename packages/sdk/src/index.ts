import { Account } from "./account";
import { Config } from "./common/config"
import { NftService } from "./nft/nft.service";
import { ConfigParams } from "./types";

function setup(config: ConfigParams)  {
    Config.ALCHEMY_API_KEY = config.alchemyApiKey!;
    Config.ETHERSCAN_API_KEY  = config.etherscanApiKey!;
    Config.INFURA_PROJECT_ID = config.infuraProjectId!;
    Config.POCKET_NETWORK_APPLICATION_ID  = config.pocketNetworkApplicationID!;
    Config.QUORUM = config.quorum!;
    Config.SLOW_GAS_PRICE_MULTIPLIER = config.slowGasPriceMultiplier!;
    Config.AVERAGE_GAS_PRICE_MULTIPLIER = config.averageGasPriceMultiplier!;
    Config.FAST_GAS_PRICE_MULTIPLIER = config.fastGasPriceMultiplier!;
    Config.GAS_LIMIT_MARGIN = config.gasLimitMargin!;
    Config.ADDRESS_GENERATION_COUNT = config.addressGenerationCount!;
}


export const sdk =  { nft: NftService, setup, account: Account}
