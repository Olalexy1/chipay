"use server";

import {
  Account,
  AppwriteException,
  Client,
  ID,
  Query,
  Models,
} from "node-appwrite";
import {
  createAdminClient,
  createClient,
  createSessionClient,
} from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify, decryptId, encryptId } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  CHIMONEY_API_KEY: API_KEY,
  CHIMONEY_API_URL: API_URL,
  NEXT_PUBLIC_SITE_URL: WEB_APP_URL,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  const decryptPassword = decryptId(password);

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(
      email,
      decryptPassword
    );

    cookies().set("chimoney-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    data = parseStringify(user);
    return { data, error: null };
  } catch (err) {
    console.error("Error", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    }
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;

  let newUserAccount;

  const decryptPassword = decryptId(password);

  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      decryptPassword,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user account");

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY": API_KEY!,
      },
      body: JSON.stringify({
        name: `${firstName} ${lastName}`,
        email: email,
        firstName: firstName,
        lastName: lastName,
      }),
    };

    const chiMoneyUser = await fetch(
      `${API_URL}/v0.2/sub-account/create`,
      options
    );

    const chiMoneyUserID = await chiMoneyUser.json();

    if (chiMoneyUserID.status !== "success") {
      error = chiMoneyUser.json();
      return { data: null, error: parseStringify(error) };
    }

    const encryptChiMoneyUserId = encryptId(chiMoneyUserID.data.id);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id, //id from auth creation
        chiMoneyUserId: encryptChiMoneyUserId, //sub account id
      }
    );

    const user = {
      ...newUser,
      ...newUserAccount,
    };

    const session = await account.createEmailPasswordSession(
      email,
      decryptPassword
    );

    cookies().set("chimoney-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const response = await createUserEmailVerification(session.$id);

    data = parseStringify(user);
    return { data, error: null };
  } catch (err) {
    console.error("Error from signup:", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    } else {
      return { data: null, error: parseStringify(err) };
    }
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const userData: GetUserParams = await getUserInfo({ userId: result.$id });

    const user = {
      ...userData,
      ...result,
      documentId: userData.$id,
    };

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("chimoney-session");

    await account.deleteSession("current");
  } catch (error) {
    return null;
  }
};

export async function createUserEmailVerification(sessionId?: string) {
  try {
    const { account } = await createSessionClient();

    const result = await account.createVerification(
      `http://localhost:3000/verify-email` // url
    );

    return parseStringify(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUserEmailVerificationConfirmation({
  userId,
  secret,
}: verificationConfirmationProps) {
  let data;
  let error: ErrorResponse | Promise<any> | string | null;
  try {
    const { account } = await createClient();

    const result = await account.updateVerification(
      userId, // userId
      secret // secret
    );

    console.log(result, "see result from email verify confirm user action");

    data = parseStringify(result);
    return { data, error: null };
  } catch (err) {
    console.error("Error", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    } else {
      return { data: null, error: parseStringify(err) };
    }
  }
}

export async function getUserSession(
  sessionId: string
): Promise<Models.Session | null> {
  try {
    const { account } = await createClient();

    const result = await account.getSession(
      sessionId // sessionId
    );

    return parseStringify(result);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateUserInformation = async ({
  documentId,
  ...updateUserData
}: UpdateUserProps) => {
  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  try {
    const { database } = await createAdminClient();

    const updatedUser = await database.updateDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      documentId,
      {
        ...updateUserData,
      }
    );

    data = parseStringify(updatedUser);
    return { data, error: null };
  } catch (err) {
    console.error("Error from signup:", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    } else {
      return { data: null, error: parseStringify(err) };
    }
  }
};

export async function updatePassword({
  oldPassword,
  newPassword,
}: UpdatePasswordProps) {
  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  const decryptOldPassword = decryptId(oldPassword);
  const decryptNewPassword = decryptId(newPassword);

  try {
    const { account } = await createSessionClient();

    const result = await account.updatePassword(
      decryptNewPassword, // newPassword
      decryptOldPassword
    );

    console.log(result, "see result from password update");

    data = parseStringify(result);
    return { data, error: null };
  } catch (err) {
    console.error("Error", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    } else {
      return { data: null, error: parseStringify(err) };
    }
  }
}

export async function createPasswordRecovery({ email } :ForgotPasswordProps) {
  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  try {
    const { account } = await createClient();

    const result = await account.createRecovery(
      email, // email
      `http://localhost:3000/confirm-password`
    );

    data = parseStringify(result);
    return { data, error: null };
  } catch (err) {
    console.error("Error", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    } else {
      return { data: null, error: parseStringify(err) };
    }
  }
}

export async function passwordRecoveryConfirmation({
  userId,
  secret,
  password,
}: passwordRecoveryConfirmationProps) {
  let data;
  let error: ErrorResponse | Promise<any> | string | null;

  const decryptPassword = decryptId(password);

  try {
    const { account } = await createClient();

    const result = await account.updateRecovery(
      userId, // userId
      secret, // secret
      decryptPassword // password
    );

    data = parseStringify(result);
    return { data, error: null };
  } catch (err) {
    console.error("Error", err);
    if (err instanceof AppwriteException) {
      error = parseStringify(err.message);
      return { data: null, error };
    } else {
      return { data: null, error: parseStringify(err) };
    }
  }
}
