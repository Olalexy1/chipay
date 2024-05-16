"use server";

import { parseStringify } from "../utils";

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
  try {
    const response = await fetch(
      `${API_URL}/v0.2/sub-account/get?id=${subAccountId}`,
      getOptions
    );
    const json = await response.json();
    return parseStringify(json);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useVerifyBankAccount = async (accounts: AccountDetails[]) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify({
      verifyAccountNumbers: accounts,
    }),
  };

  //   verifyAccountNumbers: [{countryCode: 'NG', account_bank: '044', account_number: '0690000031'}]

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

export const useGetAllUserTransactions = async (subAccount?: string) => {
  const requestBody = subAccount ? { subAccount } : {};
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify(requestBody),
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

export const useGetAllUserWallets = async (subAccount?: string) => {
  const requestBody = subAccount ? { subAccount } : {};
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify(requestBody),
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

export const transferToChiMoneyWallets = async (
  transferInfo: WalletTransferProps
) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "X-API-KEY": API_KEY!,
    },
    body: JSON.stringify(transferInfo),
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
