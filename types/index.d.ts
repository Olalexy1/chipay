/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  email: string;
  password: string;
  phoneNumber?: string;
};

declare type UpdateUserProps = {
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phoneNumber?: string;
  documentId: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
};

declare interface GetUserParams {
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  address1: string;
  state: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  chiMoneyUserId: string;
  phoneNumber: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance?: number;
  officialName?: string;
  mask?: string;
  institutionId?: string;
  name?: string;
  type?: string;
  subtype?: string;
  appwriteItemId?: string;
  shareableId?: string;
};

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
  isButton?: boolean;
  buttonTitle?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  icon?: React.ReactNode;
  buttonClassName?: string;
  onClick?: () => void;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface WalletTransactions {
  id: string;
  amount?: number;
  balanceBefore?: number;
  meta?: {
    issueID?: string;
    date: {
      _seconds: number;
      _nanoseconds: number;
    };
  };
  newBalance?: number;
  description?: string;
}

declare interface Wallets {
  id: string;
  owner?: string;
  balance?: number;
  type?: string;
  transactions?: WalletTransactions[];
}

declare interface TotalBalanceBoxProps {
  wallets?: Wallets[];
  balance?: number;
  type?: string;
  id?: string;
  className?: string;
}

declare interface FooterProps {
  user: User;
  type?: "mobile" | "desktop";
}

declare interface SiderbarProps {
  user: User;
}

declare interface RecentTransactionsProps {
  transactions?: Transaction[];
  page?: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
  recipientIds: string[];
}

declare interface CategoryProps {
  category: CategoryCount;
}

declare interface DoughnutChartProps {
  wallets: Wallets[];
}

declare interface PaymentTransferFormProps {
  subAccountId?: string;
  type: string;
  allSubAccounts?: any[];
}

// Actions
declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}

declare interface getInstitutionProps {
  institutionId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}

declare interface AccountDetails {
  countryCode: string;
  account_bank: string;
  account_number: string;
}

declare interface ErrorResponse {
  message?: string | null;
  code?: number | null;
  response?: string | null;
  status?: string | null;
  error?: string | null;
}

declare interface WalletTransferProps {
  subAccount?: string;
  receiver: string;
  wallet?: string;
  valueInUSD?: number;
}

declare interface Integration {
  reference: string;
  appID: string;
}

declare interface RedeemData {
  valueInUSD: number;
  walletID: string;
  wallet?: string;
  receiver: string;
  redeemData: Record<string, unknown>;
}

declare interface MetaData {
  walletOwner: string;
  chiRef: string;
  currency: string;
  type: string;
  payer: string;
  payment_method: string;
}

declare interface Payout {
  wallet: string;
}

declare interface Transaction {
  id: string;
  valueInUSD: number;
  chimoney: number;
  issueID: string;
  wallet?: string;
  receiver: string;
  fee: number;
  type: string;
  issuer: string;
  t_id: number;
  chiRef: string;
  integration: Integration;
  issueDate: string;
  redeemData: RedeemData;
  initiatedBy: string;
  paymentDate: string;
  redeemDate: string;
  meta: MetaData;
  payout: Payout;
  updatedDate: string;
  deliveryStatus: string;
  status: string;
}

declare interface PaymentRequestProps {
  valueInUSD?: number;
  payerEmail: string;
  currency?: string;
  amount?: string;
  redirect_url?: string;
  subAccount?: string;
}

declare type ChimoneyTransferProps = {
  email: string;
  phone?: string;
  valueInUSD: number;
  amount?: number;
  currency?: string;
};
declare interface TransferToOtherUsersPayload {
  chimoneys: ChimoneyTransferProps[];
  subAccount: string;
}

declare interface TransferToOtherUsersProps {
  email?: string;
  phone?: string;
  valueInUSD: number;
  amount?: number;
  currency?: string;
  subAccount: string;
}

declare type AnimatedTextProps = {
  text: string | string[];
  element?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

declare interface verificationConfirmationProps {
  userId: string;
  secret: string;
}

declare interface VerificationType {
  type: "NewUser" | "OldUser";
  userId: string;
  emailVerified?: boolean;
}

declare interface VerificationChecker {
  emailVerified: boolean;
  userId: string;
  type: "NewUser" | "OldUser";
}

declare interface AccountSettingsCardProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

declare interface Target {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  userId: string;
  providerId: string | null;
  providerType: string;
  identifier: string;
}

declare interface LoggedInUserProps {
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
  address1: string;
  state: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  chiMoneyUserId: string;
  phoneNumber: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
  name: string;
  registration: string;
  status: boolean;
  labels: any[];
  passwordUpdate: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  mfa: boolean;
  prefs: Record<string, unknown>;
  targets: Target[];
  accessedAt: string;
  documentId: string;
}

declare interface UpdatePasswordProps {
  newPassword: string;
  oldPassword: string;
}

declare interface passwordRecoveryConfirmationProps {
  userId: string;
  secret: string;
  password: string;
}

declare interface ForgotPasswordProps {
  email: string;
}

declare interface AuthFormProps {
  type: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}
