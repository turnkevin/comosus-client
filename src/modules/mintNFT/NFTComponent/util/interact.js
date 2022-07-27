/* eslint-disable @typescript-eslint/no-var-requires */
const alchemyKey =
  'https://eth-rinkeby.alchemyapi.io/v2/yXXKmWQ6Djjpipq1_2skYvDF_1NIKT2S';
const contractABI = require('../contract-abi.json');
const contractAddress = '0xf63F71584d0cF62592f1e077ceB2527a43ca91d9';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const obj = {
        status: '👆🏽 Write a message in the text-field above.',
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '👆🏽 Write a message in the text-field above.',
        };
      } else {
        return {
          address: '',
          status: '🦊 Connect to Metamask using the top right button.',
        };
      }
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

async function loadContract() {
  return new web3.eth.Contract(contractABI, contractAddress);
}

export const mintNFT = async () => {
  // const tokenURI =
  //   'https://gateway.pinata.cloud/ipfs/QmfMawKGkxVyoyeMthAgSsi1BsqJKkRnR6xUM58QCpdx1f';

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mint(window.ethereum.selectedAddress, 1)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        '✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/' +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};