var SupplyChain = artifacts.require('SupplyChain');
const Web3 = require('web3');

contract('SupplyChain', function (accounts) {
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

  it("Testing 'produceMedicine' function that allows a pharma to produce a new item in market", async () => {
    const supplyChain = await SupplyChain.deployed();

    const produceMedicineResult = await supplyChain.produceMedicine(
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
      produceMedicineResult.logs[0].event,
      'Produced',
      'Should emit Produced event'
    );
  });

  it('Testing testMedicine() function that allows a pharma to test medicine', async () => {
    const supplyChain = await SupplyChain.deployed();

    const testMedicineResult = await supplyChain.testMedicine(upc, {
      from: originPharmaId,
    });
    const resultBuffer = await supplyChain.fetchItem.call(upc);

    assert.equal(resultBuffer[9], 'Tested', 'Error: Invalid item State');
    assert.equal(
      testMedicineResult.logs[0].event,
      'Tested',
      'Should emit Tested event'
    );
  });

  // 3rd Test
  it('Testing sendToRegulation() function that allows a pharma to send meds to regulation', async () => {
    const supplyChain = await SupplyChain.deployed();

    const sendToRegulationResult = await supplyChain.sendToRegulation(
      upc,
      regulatorId,
      {
        from: originPharmaId,
      }
    );
    const resultBuffer = await supplyChain.fetchItem.call(upc);

    assert.equal(
      resultBuffer[2],
      regulatorId,
      'Error: Missing or Invalid ownerID'
    );
    assert.equal(
      resultBuffer[9],
      'SentToVerification',
      'Error: Invalid item State'
    );
    assert.equal(resultBuffer[10], regulatorId, 'Error: Invalid regulatorId');
    assert.equal(
      sendToRegulationResult.logs[0].event,
      'SentToVerification',
      'Should emit SentToVerification event'
    );
  });

  // 4th Test
  it('Testing approveMedicine() that allows a regulator to approve medicine', async () => {
    const supplyChain = await SupplyChain.deployed();

    const approveMedicineResult = await supplyChain.approveMedicine(upc, {
      from: regulatorId,
    });
    const resultBuffer = await supplyChain.fetchItem.call(upc);
    assert.equal(resultBuffer[2], originPharmaId, 'Error: Invalid ownerId');
    assert.equal(resultBuffer[9], 'Approved', 'Error: Invalid item State');
    assert.equal(
      approveMedicineResult.logs[0].event,
      'Approved',
      'Should emit Approved event'
    );
  });

  // 5th Test
  it('Testing sendToMarket() function that allows a pharma to list medicine on market', async () => {
    const supplyChain = await SupplyChain.deployed();

    const sendToMarketResult = await supplyChain.sendToMarket(
      upc,
      productPrice,
      {
        from: originPharmaId,
      }
    );
    const resultBuffer = await supplyChain.fetchItem.call(upc);
    assert.equal(resultBuffer[8], productPrice, 'Error: Invalid productPrice');
    assert.equal(resultBuffer[9], 'SentToMarket', 'Error: Invalid item State');
    assert.equal(
      sendToMarketResult.logs[0].event,
      'SentToMarket',
      'Should emit SentToMarket event'
    );
  });

  // 6th Test
  it('Testing buyMedicine() function that allows a buyer to buy medicine', async () => {
    const supplyChain = await SupplyChain.deployed();

    const buyMedicineResult = await supplyChain.buyMedicine(upc, {
      from: buyerId,
      value: Web3.utils.toWei('1', 'ether'),
    });
    const resultBuffer = await supplyChain.fetchItem.call(upc);
    assert.equal(resultBuffer[2], buyerId, 'Error: Invalid ownerId');
    assert.equal(resultBuffer[9], 'Bought', 'Error: Invalid item State');
    assert.equal(resultBuffer[11], buyerId, 'Error: Invalid buyerId');
    assert.equal(
      buyMedicineResult.logs[0].event,
      'Bought',
      'Should emit Bought event'
    );
  });

  // 7th Test
  it('Testing replenishHospitals() function that allows a buyer to mark medicine as available', async () => {
    const supplyChain = await SupplyChain.deployed();

    const replenishHospitalsResult = await supplyChain.replenishHospitals(upc, {
      from: buyerId,
    });
    const resultBuffer = await supplyChain.fetchItem.call(upc);
    assert.equal(resultBuffer[9], 'Available', 'Error: Invalid item State');
    assert.equal(
      replenishHospitalsResult.logs[0].event,
      'Available',
      'Should emit Available event'
    );
  });

  // 9th Test
  it('Testing fetchItem() function that allows anyone to fetch item details from blockchain', async () => {
    const supplyChain = await SupplyChain.deployed();

    const resultBuffer = await supplyChain.fetchItem.call(upc);
    assert.equal(resultBuffer[0], sku, 'Error: Invalid item SKU');
    assert.equal(resultBuffer[1], upc, 'Error: Invalid item UPC');
    assert.equal(resultBuffer[2], buyerId, 'Error: Missing or Invalid ownerID');
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
    assert.equal(
      resultBuffer[8],
      productPrice,
      'Error: Missing or Invalid productPrice'
    );
    assert.equal(resultBuffer[9], 'Available', 'Error: Invalid item State');
    assert.equal(
      resultBuffer[10],
      regulatorId,
      'Error: Invalid item Regulator Id'
    );
    assert.equal(resultBuffer[11], buyerId, 'Error: Invalid item Buyer Id');
  });
});
