// 🟢 Your deployed ERC-20 contract address on Sepolia
const contractAddress = "0x4b61397E530132D31bAd080E70F804C49742B030";

// 🧠 Minimal ERC20 ABI (only the function we need)
const abi = [
  "function balanceOf(address) view returns (uint256)"
];

let provider;
let signer;
let contract;

// Button elements
const connectButton = document.getElementById("connectButton");
const balanceButton = document.getElementById("balanceButton");

// 🟢 Connect wallet function
connectButton.onclick = async function () {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed!");
    return;
  }

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Ask MetaMask for permission

    signer = provider.getSigner();
    const account = await signer.getAddress();
    document.getElementById("account").innerText = `Connected: ${account}`;
    console.log("Connected account:", account);

    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log("Contract loaded:", contract.address);
  } catch (err) {
    console.error("Error connecting wallet:", err);
  }
};

// 🟢 Get token balance function
balanceButton.onclick = async function () {
  if (!contract) {
    alert("Please connect wallet first!");
    return;
  }

  try {
    const account = await signer.getAddress();
    console.log("Fetching balance for:", account);

    const balance = await contract.balanceOf(account);
    console.log("Raw balance:", balance.toString());

    document.getElementById("balance").innerText =
      "Your Token Balance: " + ethers.utils.formatUnits(balance, 18);
  } catch (err) {
    console.error("Error getting balance:", err);
  }
};
