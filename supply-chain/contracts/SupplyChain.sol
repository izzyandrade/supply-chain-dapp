pragma solidity >=0.8.7;

import "./BuyerRole.sol";
import "./RegulatorRole.sol";
import "./PharmaRole.sol";

contract SupplyChain is BuyerRole, RegulatorRole, PharmaRole {
    address owner;
    uint sku;

    // Define a public mapping 'items' that maps the UPC to an Item.
    mapping(uint => Item) items;

    // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash,
    // that track its journey through the supply chain -- to be sent from DApp.
    mapping(uint => string[]) itemsHistory;

    // Define enum 'State' with the following values:
    enum State {
        Produced, // 0
        Tested, // 1
        SentToVerification, // 2
        Approved, // 3
        SentToMarket, // 4
        Bought, // 5
        Available // 6
    }

    State constant defaultState = State.Produced;

    // Define a struct 'Item' with the following fields:
    struct Item {
        uint sku;
        uint upc;
        address ownerId;
        address originPharmaId;
        string originPharmaName;
        string originPharmaInformation;
        string originPharmaCountry;
        string productName;
        uint productPrice;
        State itemState;
        address regulatorId;
        address buyerId;
    }

    event Produced(uint upc);
    event Tested(uint upc);
    event SentToVerification(uint upc);
    event Approved(uint upc);
    event SentToMarket(uint upc);
    event Bought(uint upc);
    event Available(uint upc);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    modifier onlyOwnerOfMedicine(uint _upc) {
        require(msg.sender == items[_upc].ownerId);
        _;
    }

    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    // modifier checkValue(uint _upc) {
    //     _;
    //     uint _price = items[_upc].productPrice;
    //     uint amountToReturn = msg.value - _price;
    //     items[_upc].buyerID.transfer(amountToReturn);
    // }

    modifier produced(uint _upc) {
        require(items[_upc].itemState == State.Produced);
        _;
    }

    modifier tested(uint _upc) {
        require(items[_upc].itemState == State.Tested);
        _;
    }

    modifier sentToVerification(uint _upc) {
        require(items[_upc].itemState == State.SentToVerification);
        _;
    }

    modifier approved(uint _upc) {
        require(items[_upc].itemState == State.Approved);
        _;
    }

    modifier sentToMarket(uint _upc) {
        require(items[_upc].itemState == State.SentToMarket);
        _;
    }

    modifier bought(uint _upc) {
        require(items[_upc].itemState == State.Bought);
        _;
    }

    modifier available(uint _upc) {
        require(items[_upc].itemState == State.Available);
        _;
    }

    constructor() {
        owner = msg.sender;
        sku = 1;
    }

    // Define a function 'kill' if required
    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(payable(owner));
        }
    }

    // Define a function 'produceMedicine' that allows a pharma to produce a new item in market
    function produceMedicine(
        uint _upc,
        string memory _originPharmaName,
        string memory _originPharmaInformation,
        string memory _originPharmaCountry,
        string memory _productName
    ) public payable onlyPharma {
        items[_upc] = Item({
            sku: sku,
            upc: _upc,
            ownerId: msg.sender,
            originPharmaId: msg.sender,
            originPharmaName: _originPharmaName,
            originPharmaInformation: _originPharmaInformation,
            originPharmaCountry: _originPharmaCountry,
            productName: _productName,
            productPrice: 0,
            itemState: State.Produced,
            regulatorId: address(0),
            buyerId: address(0)
        });
        sku = sku + 1;
        emit Produced(_upc);
    }

    // Define a function 'testMedicine' that allows a Pharma to mark an item 'Tested'
    function testMedicine(uint _upc)
        public
        produced(_upc)
        onlyOwnerOfMedicine(_upc)
    {
        items[_upc].itemState = State.Tested;
        emit Tested(_upc);
    }

    // Define a function 'sendToRegulation' that allows a pharma to mark an item 'SentToRegulation' and change its ownership to a regulator
    function sendToRegulation(uint _upc, address _regulatorId)
        public
        tested(_upc)
        onlyPharma
        onlyOwnerOfMedicine(_upc)
    {
        require(isRegulator(_regulatorId), "This address is not a Regulator");
        items[_upc].regulatorId = _regulatorId;
        items[_upc].itemState = State.SentToVerification;
        items[_upc].ownerId = _regulatorId;
        emit SentToVerification(_upc);
    }

    function approveMedicine(uint _upc)
        public
        sentToVerification(_upc)
        onlyRegulator
        onlyOwnerOfMedicine(_upc)
    {
        items[_upc].itemState = State.Approved;
        items[_upc].ownerId = items[_upc].originPharmaId;
        emit Approved(_upc);
    }

    function sendToMarket(uint _upc, uint _price)
        public
        approved(_upc)
        onlyPharma
        onlyOwnerOfMedicine(_upc)
    {
        items[_upc].productPrice = _price;
        items[_upc].itemState = State.SentToMarket;
    }
}
