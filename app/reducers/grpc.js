import {
  GETWALLETSERVICE_ATTEMPT, GETWALLETSERVICE_FAILED, GETWALLETSERVICE_SUCCESS,
  GETBALANCE_ATTEMPT, GETBALANCE_FAILED, GETBALANCE_SUCCESS,
  GETACCOUNTNUMBER_ATTEMPT, GETACCOUNTNUMBER_FAILED, GETACCOUNTNUMBER_SUCCESS,
  GETNETWORK_ATTEMPT, GETNETWORK_FAILED, GETNETWORK_SUCCESS,
  GETPING_ATTEMPT, GETPING_FAILED, GETPING_SUCCESS,
  GETSTAKEINFO_ATTEMPT, GETSTAKEINFO_FAILED, GETSTAKEINFO_SUCCESS,
  GETTICKETPRICE_ATTEMPT, GETTICKETPRICE_FAILED, GETTICKETPRICE_SUCCESS,
  GETACCOUNTS_ATTEMPT, GETACCOUNTS_FAILED, GETACCOUNTS_SUCCESS,
  GETTRANSACTIONS_ATTEMPT, GETTRANSACTIONS_FAILED, GETTRANSACTIONS_PROGRESS, GETTRANSACTIONS_COMPLETE,
  GETTRANSACTIONS_UNMINED_PROGRESS,
  PAGINATETRANSACTIONS,
  GETTRANSACTIONDETAILS_SET, GETTRANSACTIONDETAILS_CLEAR,
  UPDATETIMESINCEBLOCK,
} from '../actions/ClientActions';

export default function grpc(state = {}, action) {
  switch (action.type) {
  case GETWALLETSERVICE_ATTEMPT:
    return {
      ...state,
      getWalletServiceError: null,
      getWalletServiceRequestAttempt: true,
    };
  case GETWALLETSERVICE_FAILED:
    return {
      ...state,
      getWalletServiceError: action.error,
      getWalletServiceRequestAttempt: false,
    };
  case GETWALLETSERVICE_SUCCESS:
    return {
      ...state,
      getBalanceError: null,
      getWalletServiceRequestAttempt: false,
      walletService: action.walletService,
    };
  case GETBALANCE_ATTEMPT:
    return {
      ...state,
      getBalanceError: null,
      getBalanceRequestAttempt: true,
      getBalanceRequest: action.request,
    };
  case GETBALANCE_FAILED:
    return {
      ...state,
      getBalanceError: action.error,
      getBalanceRequestAttempt: false,
      getBalanceRequest: null,
    };
  case GETBALANCE_SUCCESS:
    return {
      ...state,
      getBalanceError: '',
      getBalanceRequestAttempt: false,
      getBalanceResponse: action.getBalanceResponse,
    };
  case GETACCOUNTNUMBER_ATTEMPT:
    return {
      ...state,
      getAccountNumberError: '',
      getAccountNumberRequestAttempt: true,
      getAccountNumberRequest: action.request,
    };
  case GETACCOUNTNUMBER_FAILED:
    return {
      ...state,
      getAccountNumberError: action.error,
      getAccountNumberRequestAttempt: false,
    };
  case GETACCOUNTNUMBER_SUCCESS:
    return {
      ...state,
      getAccountNumberError: '',
      getAccountNumberRequestAttempt: false,
      getAccountNumberResponse: action.getAccountNumberResponse,
    };
  case GETNETWORK_ATTEMPT:
    return {
      ...state,
      getNetworkError: null,
      getNetworkRequestAttempt: true,
      getNetworkRequest: action.request,
    };
  case GETNETWORK_FAILED:
    return {
      ...state,
      getNetworkError: action.error,
      getNetworkRequestAttempt: false,
    };
  case GETNETWORK_SUCCESS:
    return {
      ...state,
      getNetworkError: null,
      getNetworkRequestAttempt: false,
      getNetworkResponse: action.getNetworkResponse,
    };
  case GETPING_ATTEMPT:
    return {
      ...state,
      getPingError: '',
      getPingRequestAttempt: true,
      getPingRequest: action.request,
    };
  case GETPING_FAILED:
    return {
      ...state,
      getPingError: action.error,
      getPingRequestAttempt: false,
    };
  case GETPING_SUCCESS:
    return {
      ...state,
      getPingError: '',
      getPingRequestAttempt: false,
      getPingResponse: action.getPingResponse,
    };
  case GETSTAKEINFO_ATTEMPT:
    return {
      ...state,
      getStakeInfoError: '',
      getStakeInfoRequestAttempt: true,
      getStakeInfoRequest: action.request,
    };
  case GETSTAKEINFO_FAILED:
    return {
      ...state,
      getStakeInfoError: action.error,
      getStakeInfoRequestAttempt: false,
    };
  case GETSTAKEINFO_SUCCESS:
    return {
      ...state,
      getStakeInfoError: '',
      getStakeInfoRequestAttempt: false,
      getStakeInfoResponse: action.getStakeInfoResponse,
    };
  case GETTICKETPRICE_ATTEMPT:
    return {
      ...state,
      getTicketPriceError: '',
      getTicketPriceRequestAttempt: true,
      getTicketPriceRequest: action.request,
    };
  case GETTICKETPRICE_FAILED:
    return {
      ...state,
      getTicketPriceError: action.error,
      getTicketPriceRequestAttempt: false,
    };
  case GETTICKETPRICE_SUCCESS:
    return {
      ...state,
      getTicketPriceError: '',
      getTicketPriceRequestAttempt: false,
      getTicketPriceResponse: action.getTicketPriceResponse,
    };
  case GETACCOUNTS_ATTEMPT:
    return {
      ...state,
      getAccountsError: '',
      getAccountsRequestAttempt: true,
      getAccountsRequest: action.request,
    };
  case GETACCOUNTS_FAILED:
    return {
      ...state,
      getAccountsError: action.error,
      getAccountsRequestAttempt: false,
    };
  case GETACCOUNTS_SUCCESS:
    return {
      ...state,
      getAccountsError: '',
      getAccountsRequestAttempt: false,
      getAccountsResponse: action.response,
    };
  case PAGINATETRANSACTIONS:
    return {
      ...state,
      paginatedTxs: action.paginatedTxs,
      currentPage: action.currentPage,
    };
  case GETTRANSACTIONS_ATTEMPT:
    return {
      ...state,
      transactionsInfo: Array(),
      getTransactionsRequestAttempt: true,
    };
  case GETTRANSACTIONS_FAILED:
    return {
      ...state,
      getTransactionsRequestError: action.error,
      getTransactionsRequestAttempt: false,
    };
  case GETTRANSACTIONS_COMPLETE:
    return {
      ...state,
      getTransactionsRequestError: '',
      getTransactionsRequestAttempt: false,
    };
  case GETTRANSACTIONS_PROGRESS:
    return {
      ...state,
      transactionsInfo: action.transactionsInfo,
    };
  case GETTRANSACTIONS_UNMINED_PROGRESS:
    return {
      ...state,
      unminedTransactions: action.unmined,
    };
  case GETTRANSACTIONDETAILS_SET:
    return {
      ...state,
      transactionDetails: action.tx,
    };
  case GETTRANSACTIONDETAILS_CLEAR:
    return {
      ...state,
      transactionDetails: null,
    };
  case UPDATETIMESINCEBLOCK:
    return {
      ...state,
      timeSinceString: action.timeSinceString,
    };
  default:
    return state;
  }
}