var SupplyChain = artifacts.require('SupplyChain');
const Web3 = require('web3');

contract('SupplyChain', function (accounts) {
  // Declare few constants and assign a few sample accounts generated by ganache-cli
  var sku = 1;
  var upc = 1;
  const ownerId = accounts[0];
  const originPharmaId = accounts[1];
  const originPharmaName = 'John Doe';
  const originPharmaInformation = 'Yarray Valley';
  const originPharmaCountry = 'Brazil';
  const productName = 'Headache Pills';
  const productPrice = Web3.utils.toWei('1', 'ether');
  var itemState = 0;
  const regulatorId = accounts[2];
  const buyerId = accounts[3];
  const emptyAddress = '0x00000000000000000000000000000000000000';

  console.log('ganache-cli accounts used here...');
  console.log('Contract Owner: accounts[0] ', accounts[0]);
  console.log('Pharma: accounts[1] ', accounts[1]);
  console.log('Regulator: accounts[2] ', accounts[2]);
  console.log('Buyer: accounts[3] ', accounts[3]);

  it('Testing if all roles have been assigned correctly', async () => {
    const supplyChain = await SupplyChain.deployed();

    await supplyChain.addPharma(accounts[1]);
    await supplyChain.addRegulator(accounts[2]);
    await supplyChain.addBuyer(accounts[3]);

    assert.equal(
      await supplyChain.isPharma(accounts[1]),
      true,
      'Error: address is not Pharma'
    );
    assert.equal(
      await supplyChain.isRegulator(accounts[2]),
      true,
      'Error: address is not Regulator'
    );
    assert.equal(
      await supplyChain.isBuyer(accounts[3]),
      true,
      'Error: address is not Buyer'
    );
  });

  // 1st Test
  it("Testing 'produceMedicine' function that allows a pharma to produce a new item in market", async () => {
    const supplyChain = await SupplyChain.deployed();

    const producedMedicine = await supplyChain.produceMedicine(
      upc,
      originPharmaName,
      originPharmaInformation,
      originPharmaCountry,
      productName,
      { from: originPharmaId }
    );

    const resultBuffer = await supplyChain.fetchItem.call(upc);

    // Verify the result set
    assert.equal(resultBuffer[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBuffer[1], upc, 'Error: Invalid item UPC');
    assert.equal(
      resultBuffer[2],
      originPharmaId,
      'Error: Missing or Invalid ownerID'
    );
    assert.equal(
      resultBuffer[3],
      originPharmaId,
      'Error: Missing or Invalid pharmaId'
    );
    assert.equal(
      resultBuffer[4],
      originPharmaName,
      'Error: Missing or Invalid originPharmaName'
    );
    assert.equal(
      resultBuffer[5],
      originPharmaInformation,
      'Error: Missing or Invalid originPharmaInformation'
    );
    assert.equal(
      resultBuffer[6],
      originPharmaCountry,
      'Error: Missing or Invalid originPharmaCountry'
    );
    assert.equal(
      resultBuffer[7],
      productName,
      'Error: Missing or Invalid productName'
    );
    assert.equal(resultBuffer[8], 0, 'Error: Missing or Invalid productPrice');
    assert.equal(resultBuffer[9], 'Produced', 'Error: Invalid item State');
    assert.equal(
      producedMedicine.logs[0].event,
      'Produced',
      'Should emit Produced event'
    );
  });

  // 2nd Test
  it('Testing smart contract function processItem() that allows a farmer to process coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event Processed()

    // Mark an item as Processed by calling function processtItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 3rd Test
  it('Testing smart contract function packItem() that allows a farmer to pack coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event Packed()

    // Mark an item as Packed by calling function packItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 4th Test
  it('Testing smart contract function sellItem() that allows a farmer to sell coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event ForSale()

    // Mark an item as ForSale by calling function sellItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 5th Test
  it('Testing smart contract function buyItem() that allows a distributor to buy coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event Sold()
    // var event = supplyChain.Sold();

    // Mark an item as Sold by calling function buyItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 6th Test
  it('Testing smart contract function shipItem() that allows a distributor to ship coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event Shipped()

    // Mark an item as Sold by calling function shipItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 7th Test
  it('Testing smart contract function receiveItem() that allows a retailer to mark coffee received', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event Received()

    // Mark an item as Sold by calling function receiveItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 8th Test
  it('Testing smart contract function purchaseItem() that allows a consumer to purchase coffee', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Declare and Initialize a variable for event

    // Watch the emitted event Purchased()

    // Mark an item as Sold by calling function purchaseItem()

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set
  });

  // 9th Test
  it('Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set:
  });

  // 10th Test
  it('Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain', async () => {
    const supplyChain = await SupplyChain.deployed();

    // Retrieve the just now saved item from blockchain by calling function fetchItem()

    // Verify the result set:
  });
});
