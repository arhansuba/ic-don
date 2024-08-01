// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Randomness {
    struct RandomRequest {
        uint256 id;
        address requester;
        uint256 seed;
        bool completed;
        uint256 random_value;
    }

    struct RandomGenerator {
        uint256 request_counter;
        mapping(uint256 => RandomRequest) requests;
    }

    RandomGenerator public generator;

    event RandomRequestCreated(uint256 id, address requester, uint256 seed);
    event RandomValueGenerated(uint256 id, address requester, uint256 random_value);

    uint256 constant ERR_REQUEST_NOT_FOUND = 1;
    uint256 constant ERR_REQUEST_ALREADY_COMPLETED = 2;

    function initialize() public {
        generator.request_counter = 0;
    }

    function createRandomRequest(uint256 seed) public returns (uint256) {
        uint256 id = generator.request_counter;
        RandomRequest memory request = RandomRequest({
            id: id,
            requester: msg.sender,
            seed: seed,
            completed: false,
            random_value: 0
        });
        generator.requests[id] = request;
        generator.request_counter += 1;

        emit RandomRequestCreated(id, msg.sender, seed);
        return id;
    }

    function generateRandomValue(uint256 request_id) public {
        RandomRequest storage request = generator.requests[request_id];

        // Ensure the request is valid and not completed
        require(request.id != 0, "Request not found");
        require(!request.completed, "Request already completed");

        uint256 seed = request.seed;
        uint256 timestamp = block.timestamp; // Placeholder for actual timestamp retrieval
        uint256 random_value = generateRandom(seed, timestamp);

        request.random_value = random_value;
        request.completed = true;

        emit RandomValueGenerated(request.id, request.requester, random_value);
    }

    function getRandomRequest(uint256 request_id) public view returns (RandomRequest memory) {
        RandomRequest storage request = generator.requests[request_id];
        require(request.id != 0, "Request not found");
        return request;
    }

    function listRandomRequests() public view returns (RandomRequest[] memory) {
        uint256 count = generator.request_counter;
        RandomRequest[] memory requests = new RandomRequest[](count);
        for (uint256 i = 0; i < count; i++) {
            RandomRequest storage request = generator.requests[i];
            requests[i] = request;
        }
        return requests;
    }

    function generateRandom(uint256 seed, uint256 timestamp) internal pure returns (uint256) {
        uint256 combined_value = seed + timestamp;
        uint256 random_value = combined_value % 1000000; // Example range: 0 to 999999
        return random_value;
    }
}
