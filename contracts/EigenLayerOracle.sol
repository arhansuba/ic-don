// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EigenLayerOracle {
    struct DataRequest {
        uint256 id;
        string data_type;
        address requester;
        bool completed;
        string data;
        address[] validators;
    }

    struct Validator {
        uint256 id;
        address validator_address;
        uint256 stake;
        uint256 requestCount;
    }

    struct Oracle {
        uint256 request_counter;
        mapping(uint256 => DataRequest) requests;
        mapping(address => Validator) validators;
        mapping(uint256 => mapping(address => bool)) validatorSubmitted;
        address[] validatorList;
    }

    Oracle public oracle;
    address public admin;
    uint256 public minimumStake;
    uint256 public rewardAmount;

    event RequestCreated(uint256 indexed id, string data_type, address indexed requester);
    event DataSubmitted(uint256 indexed request_id, address indexed validator, string data);
    event ValidatorRegistered(address indexed validator_address, uint256 stake);
    event ValidatorRemoved(address indexed validator_address);
    event MinimumStakeUpdated(uint256 newMinimumStake);
    event RewardAmountUpdated(uint256 newRewardAmount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Unauthorized: Only admin can perform this action");
        _;
    }

    modifier onlyValidator() {
        require(oracle.validators[msg.sender].stake >= minimumStake, "Unauthorized: Only validators with sufficient stake can perform this action");
        _;
    }

    constructor(uint256 _minimumStake, uint256 _rewardAmount) {
        admin = msg.sender;
        oracle.request_counter = 0;
        minimumStake = _minimumStake;
        rewardAmount = _rewardAmount;
    }

    function registerValidator(address validator_address, uint256 stake) public onlyAdmin {
        require(oracle.validators[validator_address].id == 0, "Validator already registered");
        Validator memory validator = Validator({
            id: block.number,
            validator_address: validator_address,
            stake: stake,
            requestCount: 0
        });
        oracle.validators[validator_address] = validator;
        oracle.validatorList.push(validator_address);

        emit ValidatorRegistered(validator_address, stake);
    }

    function requestData(string memory data_type) public returns (uint256) {
        uint256 id = oracle.request_counter;
        DataRequest storage request = oracle.requests[id];
        request.id = id;
        request.data_type = data_type;
        request.requester = msg.sender;
        request.completed = false;

        oracle.request_counter += 1;

        emit RequestCreated(id, data_type, msg.sender);
        return id;
    }

    function submitData(uint256 request_id, string memory data) public onlyValidator {
        DataRequest storage request = oracle.requests[request_id];
        require(request.id != 0, "Request not found");
        require(!request.completed, "Request already completed");
        require(!oracle.validatorSubmitted[request_id][msg.sender], "Validator has already submitted data for this request");

        request.validators.push(msg.sender);
        oracle.validatorSubmitted[request_id][msg.sender] = true;
        request.data = data;
        request.completed = true;

        oracle.validators[msg.sender].requestCount += 1;
        payable(msg.sender).transfer(rewardAmount);

        emit DataSubmitted(request_id, msg.sender, data);
    }

    function getRequest(uint256 request_id) public view returns (uint256, string memory, address, bool, string memory, address[] memory) {
        DataRequest storage request = oracle.requests[request_id];
        require(request.id != 0, "Request not found");
        return (request.id, request.data_type, request.requester, request.completed, request.data, request.validators);
    }

    function getValidator(address validator_address) public view returns (uint256, address, uint256, uint256) {
        Validator storage validator = oracle.validators[validator_address];
        require(validator.id != 0, "Validator not found");
        return (validator.id, validator.validator_address, validator.stake, validator.requestCount);
    }

    function listRequests() public view returns (DataRequest[] memory) {
        uint256 count = oracle.request_counter;
        DataRequest[] memory requests = new DataRequest[](count);
        for (uint256 i = 0; i < count; i++) {
            DataRequest storage request = oracle.requests[i];
            requests[i] = DataRequest({
                id: request.id,
                data_type: request.data_type,
                requester: request.requester,
                completed: request.completed,
                data: request.data,
                validators: request.validators
            });
        }
        return requests;
    }

    function updateMinimumStake(uint256 _minimumStake) public onlyAdmin {
        minimumStake = _minimumStake;
        emit MinimumStakeUpdated(_minimumStake);
    }

    function updateRewardAmount(uint256 _rewardAmount) public onlyAdmin {
        rewardAmount = _rewardAmount;
        emit RewardAmountUpdated(_rewardAmount);
    }

    function removeValidator(address validator_address) public onlyAdmin {
        require(oracle.validators[validator_address].id != 0, "Validator not found");
        delete oracle.validators[validator_address];
        for (uint256 i = 0; i < oracle.validatorList.length; i++) {
            if (oracle.validatorList[i] == validator_address) {
                oracle.validatorList[i] = oracle.validatorList[oracle.validatorList.length - 1];
                oracle.validatorList.pop();
                break;
            }
        }
        emit ValidatorRemoved(validator_address);
    }

    function listValidators() public view returns (Validator[] memory) {
        uint256 count = oracle.validatorList.length;
        Validator[] memory validators = new Validator[](count);
        for (uint256 i = 0; i < count; i++) {
            Validator storage validator = oracle.validators[oracle.validatorList[i]];
            validators[i] = Validator({
                id: validator.id,
                validator_address: validator.validator_address,
                stake: validator.stake,
                requestCount: validator.requestCount
            });
        }
        return validators;
    }

    receive() external payable {}
}
