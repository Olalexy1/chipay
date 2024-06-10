"use server";

import { decryptId, parseStringify } from "../utils";

const { CHIMONEY_API_KEY: API_KEY, CHIMONEY_API_URL: API_URL } = process.env;

const getOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": API_KEY!,
  },
};

export const getAllSupportedBanksByCountry = async (countryCode: string) => {
  try {
    const response = await fetch(
      `${API_URL}/v0.2/info/country-banks?countryCode=${countryCode}`,
      getOptions
    );
    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllSupportedAirtimeCountries = async () => {
  try {
    const response = await fetch(
      `${API_URL}/v0.2/info/airtime-countries`,
      getOptions
    );
    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllBankBranchCodes = async (bankId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/v0.2/info/bank-branches?bankID=${bankId}`,
      getOptions
    );
    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSubAccountDetails = async (subAccountId: string) => {
  const decryptSubAccountId = decryptId(subAccountId);
  try {
    const response = await fetch(
      `${API_URL}/v0.2/sub-account/get?id=${decryptSubAccountId}`,
      getOptions
    );
    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const verifyBankAccount = async (accounts: AccountDetails[]) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-Type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify({
      verifyAccountNumbers: accounts,
    }),
  };

  try {
    const response = await fetch(
      `${API_URL}/v0.2/info/verify-bank-account-number`,
      options
    );
    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllUserTransactions = async (subAccountId: string) => {
  // const requestBody = subAccount ? { subAccount } : {};
  const decryptSubAccountId = decryptId(subAccountId);
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify({ subAccount: `${decryptSubAccountId}` }),
  };

  try {
    const response = await fetch(
      `${API_URL}/v0.2/accounts/transactions`,
      options
    );

    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllUserWallets = async (subAccountId: string) => {
  const subAccount = decryptId(subAccountId);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify({ subAccount }),
  };

  try {
    const response = await fetch(`${API_URL}/v0.2/wallets/list`, options);

    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getSingleUserWallet = async (subAccountId: string, walletId: string) => {
  const subAccount = decryptId(subAccountId);

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify({ subAccount, walletID: walletId }),
  };

  try {
    const response = await fetch(`${API_URL}/v0.2/wallets/lookup`, options);

    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const transferToChiMoneyWallets = async (
  transferInfo: WalletTransferProps
) => {
  const decryptTransferInfo: WalletTransferProps = {
    subAccount: decryptId(transferInfo.subAccount!),
    receiver: decryptId(transferInfo.receiver!),
    wallet: transferInfo.wallet!,
    valueInUSD: transferInfo.valueInUSD!,
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify(decryptTransferInfo),
  };

  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  try {
    const response = await fetch(`${API_URL}/v0.2/wallets/transfer`, options);

    const json = await response.json();
    data = parseStringify(json);
    return { data, error: null };
  } catch (err) {
    console.log(err);
    error = parseStringify(err);
    return { data: null, error: error };
  }
};

export const getPublicProfile = async (userID: string) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify({ userID }),
  };

  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  try {
    const response = await fetch(
      `${API_URL}/v0.2/accounts/public-profile`,
      options
    );

    const json = await response.json();
    data = parseStringify(json);
    return { data, error: null };
  } catch (err) {
    console.log(err);
    error = parseStringify(err);
    return { data: null, error: error };
  }
};

export const paymentRequest = async (paymentRequest: PaymentRequestProps) => {
  const decryptPaymentRequest: PaymentRequestProps = {
    subAccount: decryptId(paymentRequest.subAccount!),
    valueInUSD: paymentRequest.valueInUSD!,
    currency: paymentRequest.currency,
    payerEmail: paymentRequest.payerEmail!,
    amount: paymentRequest.amount,
    redirect_url: paymentRequest.redirect_url,
  };
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(decryptPaymentRequest),
  };

  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  try {
    const response = await fetch(`${API_URL}/v0.2/payment/initiate`, options);
    const json = await response.json();
    data = parseStringify(json);
    return { data, error: null };
  } catch (err) {
    console.log(err);
    error = parseStringify(err);
    return { data: null, error: error };
  }
};

export const getAllSubAccountAssociatedWithUser = async () => {
  let data;
  let error: Promise<any> | string | null;
  try {
    const response = await fetch(
      `${API_URL}/v0.2/sub-account/list`,
      getOptions
    );
    const json = await response.json();
    data = parseStringify(json);
    return { data, error: null };
  } catch (err) {
    error = parseStringify(err);
    return { data: null, error: error };
  }
};

export const transferToOtherUsers = async (
  transferInfo: TransferToOtherUsersProps
) => {
  const decryptTransferInfo: TransferToOtherUsersPayload = {
    chimoneys: [
      {
        email: transferInfo.email!,
        // phone: transferInfo.phone,
        valueInUSD: transferInfo.valueInUSD,
        amount: transferInfo.amount,
        currency: transferInfo.currency,
      },
    ],
    subAccount: decryptId(transferInfo.subAccount!),
  };

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify(decryptTransferInfo),
  };

  let data;
  let error: Promise<any> | string | null;

  try {
    const response = await fetch(`${API_URL}/v0.2/payouts/chimoney`, options);

    const json = await response.json();
    data = parseStringify(json);
    return { data, error: null };
  } catch (err) {
    console.log(err);
    error = parseStringify(err);
    return { data: null, error: error };
  }
};
