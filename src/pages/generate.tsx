import React, { useState } from 'react';
import * as bip39 from 'bip39';
import hdkey from 'hdkey';
import wif from 'wif';
import ecc from 'eosjs-ecc';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PubkeyGenerator: React.FC = () => {
  const router = useRouter();
  const [mnemonic, setMnemonic] = useState<string>('');
  const [privateExtendedKey, setprivateExtendedKey] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [generateClicked, setGenerateClicked] = useState(false); // New state variable

  const openModal = () => {
    setShowModal(true);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = event.target;
    if (checked) {
      closeModal();
      generateMnemonicPhrase();
    }
  };

  const closeModal = (): void => {
    setShowModal(false);
  };

  const generateMnemonicPhrase = (): void => {
    const mnemonic: string = bip39.generateMnemonic();
    setMnemonic(mnemonic);
    const seed: Buffer = bip39.mnemonicToSeedSync(mnemonic);
    console.log(seed.toString('hex'));
    const root: hdkey = hdkey.fromMasterSeed(seed);
    const masterPrivateKey: Buffer = root.privateKey;
    const child: hdkey = root.derive("m/44'/194'/0'/0/0");
    const privateKey: Buffer = child.privateKey;
    const publicKey: string = ecc.PrivateKey(child.privateKey).toPublic().toString();
    const privateExtendedKey: string = root.privateExtendedKey;
    setprivateExtendedKey(privateExtendedKey);
    setGenerateClicked(true);
    console.log('privateExtendedKey : ' + privateExtendedKey);
    setPublicKey(publicKey);
    setPrivateKey(wif.encode(128, privateKey, false));
  };

  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey(!showPrivateKey);
  };

  const downloadTextFile = () => {
    const content = `Mnemonic: ${mnemonic}\nPublic Key: ${publicKey}\nPrivate Key: ${privateKey}\nPrivate Extended Key: ${privateExtendedKey}\n\n***NEVER give your mnemonic seed phrase, private key, extended private keyto anyone ever***`;
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'keys.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  return (
    <div className='justify-content-center container mt-10 max-w-screen-sm text-center'>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold text-white sm:text-4.5xl'>
          Libre Blockchain Seed Phrase and Key Generator
        </h1>
        <p className='mt-5 text-sm text-shade-200 sm:text-base'>
          The purpose of this tool is to provide a simple way to generate seed phrases and keypairs
          to use for creating Libre accounts at{' '}
          <a href='https://accounts.libre.org/' className='underline hover:text-orange-600'>
            accounts.libre.org
          </a>{' '}
          or for use in wallets such as{' '}
          <a href='https://www.bitcoinlibre.io/' className='underline hover:text-orange-600'>
            Bitcoin Libre
          </a>{' '}
          or{' '}
          <a href='https://www.greymass.com/anchor' className='underline hover:text-orange-600'>
            Anchor
          </a>{' '}
        </p>
      </div>
      <ToastContainer />
      <p className='mt-5'>
        You can download a local version of this explorer + tool here from{' '}
        <a
          href='https://github.com/LibreBlocksio/Libre-Blocks-Explorer'
          className='underline hover:text-orange-600'
        >
          Github
        </a>{' '}
      </p>
      <div className='justify-content-center container max-w-screen-sm text-center'>
        <button
          className='mb-4 mr-2 mt-10 rounded-lg bg-white px-5 py-2 text-black hover:bg-orange-600 hover:text-white'
          onClick={openModal}
        >
          Generate Key Pair
        </button>
        {generateClicked && ( // Condition "Download Keys"
          <button
            className='mb-4 mt-10 rounded-lg bg-white px-5 py-2 text-black hover:bg-orange-600 hover:text-white'
            onClick={downloadTextFile}
          >
            Download Keys
          </button>
        )}

        {showModal ? (
          <div className='modal w-full max-w-full'>
            <div className=' text-center '>
              <p className='mb-5  text-center'>
                You will be shown some private data. Make sure no one can see your screen - not even
                cameras.
                <p className='mb-5  mt-2 text-center'>
                  Write down the following data somewhere safe and NEVER give your seed phrase or
                  private key to anyone ever.
                </p>
              </p>

              <label className='ml-l text-center '>Check box if you have read the above</label>
              <input className='ml-4' type='checkbox' onChange={handleCheckboxChange} />
            </div>
          </div>
        ) : (
          <>
            {mnemonic && (
              <div
                className=' border-5 my-5 cursor-pointer  rounded-lg bg-[#58280a] px-5 py-3'
                onClick={() => {
                  navigator.clipboard.writeText(mnemonic);
                  toast.success('Mnemonic Copied to clipboard!', { autoClose: 2000 });
                }}
              >
                <div className='flex items-center justify-center'>
                  <h3 className='mr-2 text-[#ff6200]'>Mnemonic Key</h3>
                </div>

                <div className='mt-3 flex flex-wrap justify-center'>
                  {mnemonic.split(' ').map((word, index) => (
                    <div key={index} className='m-1'>
                      <Chip
                        label={
                          <span>
                            <span style={{ color: 'gray' }}>{index + 1}. </span>
                            {word}
                          </span>
                        }
                        className='m-1'
                        sx={{
                          backgroundColor: 'gainsboro',
                          cursor: 'pointer',
                          borderRadius: '10',
                          '&:hover': {
                            backgroundColor: 'orange',
                            color: 'black',
                          },
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {publicKey && (
              <div
                className='border-5 my-5 cursor-pointer rounded-lg bg-green-800 px-5 py-3'
                onClick={() => {
                  navigator.clipboard.writeText(publicKey);
                  toast.success('Public Key Copied to clipboard!', { autoClose: 2000 });
                }}
              >
                <h3 className='text-[#33c954]'>Public Key</h3>
                <p className='mb-0 mt-2 break-all rounded-lg px-5 py-2 text-center '>{publicKey}</p>
              </div>
            )}

            {privateKey && (
              <div
                className='border-5 my-5 cursor-pointer rounded-lg bg-[#5d0808] px-5 py-3'
                onClick={() => {
                  navigator.clipboard.writeText(privateKey);
                  toast.success('Private Key Copied to clipboard!', { autoClose: 2000 });
                }}
              >
                <h3 className='text-[#ef4141]'>Private Key</h3>
                <p className='break-all rounded-lg px-5 py-2 '>{privateKey}</p>
              </div>
            )}
            {privateExtendedKey && (
              <div
                className='border-5 my-5 cursor-pointer  rounded-lg bg-[#0c3d74] px-5 py-3'
                onClick={() => {
                  navigator.clipboard.writeText(privateExtendedKey);
                  toast.success('Private Extended Key Copied to clipboard!', { autoClose: 2000 });
                }}
              >
                <h3 className='text-[#435efa]'>Private Extended Key</h3>
                <p className='mb-0 mt-2 break-all rounded-lg px-5 py-2 text-center'>
                  {privateExtendedKey}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PubkeyGenerator;
