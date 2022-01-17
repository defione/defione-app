import { createStore } from 'vuex';
import exchange from './modules/exchange';
import migrate from './modules/migrate';
import bridge from './modules/bridge';
import liquidity from './modules/liquidity';
import farm from './modules/farm';
import pairs from './modules/pairs';
import wallet from './modules/wallet';
import user from './modules/user';
import addressConstants from './modules/addressConstants';

export default createStore({
  modules: {
    exchange,
    migrate,
    bridge,
    liquidity,
    farm,
    wallet,
    user,
    addressConstants,
    pairs
  }
});