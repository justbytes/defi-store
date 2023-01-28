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

    event List(string name, uint cost, uint quantity);

    mapping(uint => Item) public items;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor() { 
        owner = msg.sender;
    }

    //list products
    function list(uint _id, 
    string memory _name, 
    string memory _category,
    string memory _image,
    uint _cost,
    uint _rating,
    uint _stock
    ) public onlyOwner {
        
        //create Item sturct
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);
        //save Item struct
        items[_id] = item;
        //Triger event
        emit List(_name, _cost, _stock);
    }

    //buy products

    //withdraw funds
}
