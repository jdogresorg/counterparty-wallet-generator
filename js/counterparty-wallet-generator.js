/*********************************************************************
 * counterparty-wallet-generator.js 
 *
 * Custom javascript for FreeWallet (desktop version)
 *********************************************************************/

// Setup some short aliases
var bc = bitcore;

// Create HD wallet
// @net = mainnet / testnet
function createWallet(net='testnet'){
    var passphrase = new Mnemonic(128).toWords().toString().replace(/,/gi, " "),
        wallet     = Mnemonic.fromWords(passphrase.trim().split(" ")).toHex(),
        network    = bc.Networks[net],
        seed       = bc.HDPrivateKey.fromSeed(wallet, network),
        derive     = seed.derive("m/0'/0/0"),
        address    = bc.Address(derive.publicKey, network).toString();
    return [passphrase, address];
}

// Convert array of serialized form values into object with name:value pairs
function array2Object(arr){
    var vals   = {};
    for(var i=0;i<arr.length;i++){
        var o = arr[i];
        vals[o.name] = o.value;
    }
    return vals;
}