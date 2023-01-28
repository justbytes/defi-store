// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DefiStore {
    address public owner;

    struct Item {
        uint id;
        string name;
        string category;
        string image;
        uint cost;
        uint rating;
        uint stock;
    }

    struct Order {
        uint time;
        Item item;
    }

    event List(string name, uint cost, uint quantity);
    event Buy(address buyer, uint orderId, uint itemId);

    mapping(uint => Item) public items;
    mapping(address => uint) public orderCount;
    mapping(address => mapping(uint => Order)) public orders;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor() { 
        owner = msg.sender;
    }

    //List products
    function list(uint _id, 
    string memory _name, 
    string memory _category,
    string memory _image,
    uint _cost,
    uint _rating,
    uint _stock
    ) public onlyOwner {
        
        //Create Item sturct
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);
        //Save Item struct
        items[_id] = item;
        //Triger event
        emit List(_name, _cost, _stock);
    }

    //Buy products
    function buy(uint _id) public payable {
        // Fetch item
        Item memory item = items[_id];

        require(msg.value >= item.cost);
        require(item.stock > 0);
        // Create order number
        Order memory order = Order(block.timestamp, item);
        // Add order for user
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;
        //Subtract from stock
        items[_id].stock = item.stock - 1;
        // Triger event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }
    //Withdraw funds
}
