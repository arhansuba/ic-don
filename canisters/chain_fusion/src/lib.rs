use ic_cdk::export::{candid::{CandidType, Deserialize}, Principal};
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::time::Duration;

mod guard;
mod job;
mod lifecycle;
mod logs;
mod state;

use logs::scrape_eth_logs;
use lifecycle::InitArg;
use state::{read_state, State, initialize_state, mutate_state};

#[derive(Clone, Debug, CandidType, Deserialize)]
struct OracleData {
    value: u64,
    timestamp: u64,
}

thread_local! {
    static ORACLE_DATA: RefCell<Vec<OracleData>> = RefCell::new(Vec::new());
}

pub const SCRAPING_LOGS_INTERVAL: Duration = Duration::from_secs(3 * 60);

#[ic_cdk::init]
fn init(arg: InitArg) {
    initialize_state(state::State::try_from(arg).expect("BUG: failed to initialize canister"));
    setup_timers();
}

fn setup_timers() {
    let key_id = read_state(State::key_id);
    ic_cdk_timers::set_timer(Duration::ZERO, || {
        ic_cdk::spawn(async {
            let public_key = ic_evm_utils::evm_signer::get_canister_public_key(key_id, None, vec![]).await;
            let evm_address = ic_evm_utils::evm_signer::pubkey_bytes_to_address(&public_key);
            mutate_state(|s| {
                s.ecdsa_pub_key = Some(public_key);
                s.evm_address = Some(evm_address);
            });
        })
    });
    ic_cdk_timers::set_timer(Duration::from_secs(10), || ic_cdk::spawn(scrape_eth_logs()));
    ic_cdk_timers::set_timer_interval(SCRAPING_LOGS_INTERVAL, || ic_cdk::spawn(scrape_eth_logs()));
}

#[update]
async fn fetch_ethereum_data() -> Result<(), String> {
    // TODO: Implement EVM RPC call to fetch data from Ethereum
    Ok(())
}

#[query]
fn get_oracle_data() -> Vec<OracleData> {
    ORACLE_DATA.with(|data| data.borrow().clone())
}

#[update]
async fn send_data_to_ethereum(value: u64) -> Result<(), String> {
    // TODO: Implement threshold ECDSA to sign and send transaction to Ethereum
    Ok(())
}

#[ic_cdk::query]
fn get_evm_address() -> String {
    read_state(|s| s.evm_address.clone()).expect("evm address should be initialized")
}

ic_cdk::export_candid!();