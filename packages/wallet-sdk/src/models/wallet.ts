import { fromBase58 } from 'bip32';
import { Account } from './account';
import { Config } from './config';

/**
 * This object represents the keys that were derived from the root-level
 * keychain of a wallet.
 */
export interface WalletKeys {
  salt: string;
  rootKey: string;
  configPrivateKey: string;
}

export interface Wallet extends WalletKeys {
  encryptedSecretKey: string;
  config: Config;
  accounts: Account[];
}

export interface LockedWallet {
  encryptedSecretKey: string;
}

export const getRootNode = (wallet: Wallet) => {
  return fromBase58(wallet.rootKey);
};
