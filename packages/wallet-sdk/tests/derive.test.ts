import { deriveWalletKeys, deriveAccount, getStxAddress } from '../src';
import { mnemonicToSeed } from 'bip39';
import { fromBase58, fromSeed } from 'bip32';
import { TransactionVersion } from '@stacks/transactions';

test('keys are serialized, and can be deserialized properly', async () => {
  const secretKey =
    'sound idle panel often situate develop unit text design antenna ' +
    'vendor screen opinion balcony share trigger accuse scatter visa uniform brass ' +
    'update opinion media';
  const rootPrivateKey = await mnemonicToSeed(secretKey);
  const rootNode1 = fromSeed(rootPrivateKey);
  const derived = await deriveWalletKeys(rootNode1);
  const rootNode = fromBase58(derived.rootKey);
  const account = deriveAccount({ rootNode, index: 0, salt: derived.salt });
  expect(getStxAddress({ account, transactionVersion: TransactionVersion.Mainnet })).toEqual(
    'SP384CVPNDTYA0E92TKJZQTYXQHNZSWGCAG7SAPVB'
  );
});
