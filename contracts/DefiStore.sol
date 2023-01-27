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

    mapping(uint => Item) public items;

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
    ) public {
        //create Item sturct
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);
        //save Item struct
        items[_id] = item;
    }

    //buy products

    //withdraw funds
}
