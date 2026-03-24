/**
 * API Service Layer
 *
 * All functions here are placeholders for real backend calls.
 * To connect a backend, replace the mock return values with fetch/axios calls.
 *
 * Suggested base URL pattern:
 *   const BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://api.yourapp.com';
 *
 * Suggested auth pattern:
 *   headers: { Authorization: `Bearer ${await getAuthToken()}` }
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type Account = {
  id: string;
  type: string;
  number: string;
  balance: string;
  tag: string;
  tagColor: string;
  gainPct: string;
  gainAmt: string;
  riskLevel: string;
};

export type NonRegisteredAccount = {
  id: string;
  type: string;
  number: string;
  balance: string;
  balanceColor?: string;
  tag: string;
  tagColor: string;
};

export type Subscription = {
  id: string;
  name: string;
  sub: string;
  action: string;
  icon: 'close' | 'trending-up';
  accent: string;
  bg: string;
  border: string;
};

export type ActivityItem = {
  id: string;
  icon: 'add' | 'shopping-bag' | 'account-balance';
  title: string;
  sub: string;
  amount: string;
  positive: boolean;
};

export type SectorAllocation = {
  name: string;
  pct: number;
  color: string;
};

export type GeoAllocation = {
  name: string;
  pct: number;
  color: string;
};

export type AccountDetail = {
  account: Account;
  sectors: SectorAllocation[];
  geoAllocations: GeoAllocation[];
  recentActivity: ActivityItem[];
};

export type DashboardData = {
  netWorth: string;
  registeredAccounts: Account[];
  nonRegisteredAccounts: NonRegisteredAccount[];
  unusedSubscriptions: Subscription[];
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

/**
 * Fetch the full home dashboard data for the authenticated user.
 * TODO: GET /api/dashboard
 */
export async function getDashboard(): Promise<DashboardData> {
  // TODO: replace with real API call:
  // const res = await fetch(`${BASE_URL}/api/dashboard`, { headers: authHeaders() });
  // return res.json();

  return {
    netWorth: '$86,290.42',
    registeredAccounts: [
      {
        id: 'acc-retirement-001',
        type: 'Retirement',
        number: 'SY-4920',
        balance: '$1,000.00',
        tag: 'Growth Mode',
        tagColor: '#b0c4de',
        gainPct: '+4.2%',
        gainAmt: '+$40.50',
        riskLevel: 'High',
      },
      {
        id: 'acc-tfsa-001',
        type: 'TFSA',
        number: 'SY-8812',
        balance: '$84,290.42',
        tag: 'Stable',
        tagColor: '#6750a4',
        gainPct: '+12.4%',
        gainAmt: '+$9,340.12',
        riskLevel: 'Medium',
      },
    ],
    nonRegisteredAccounts: [
      {
        id: 'acc-checking-001',
        type: 'Primary Checking',
        number: 'SY-2201',
        balance: '$1,000.00',
        balanceColor: '#6750a4',
        tag: 'Liquid',
        tagColor: '#6750a4',
      },
    ],
    unusedSubscriptions: [
      {
        id: 'sub-crunchyroll',
        name: 'Crunchyroll',
        sub: '$9.99/mo potential savings',
        action: 'Cancel',
        icon: 'close',
        accent: '#6750a4',
        bg: '#fafafa',
        border: '#e0e0e01A',
      },
      {
        id: 'sub-gympass',
        name: 'Gym Pass',
        sub: '$45.00/mo potential savings',
        action: 'Cancel',
        icon: 'close',
        accent: '#6750a4',
        bg: '#fafafa',
        border: '#e0e0e01A',
      },
      {
        id: 'sub-autosavings',
        name: 'Auto-Savings',
        sub: 'Move $124.00 to high-yield',
        action: 'Execute',
        icon: 'trending-up',
        accent: '#7d5260',
        bg: '#7d52600D',
        border: '#7d52601A',
      },
    ],
  };
}

// ─── Account Detail ───────────────────────────────────────────────────────────

/**
 * Fetch full detail for a single account by ID.
 * TODO: GET /api/accounts/:accountId
 */
export async function getAccountDetail(accountId: string): Promise<AccountDetail | null> {
  // TODO: replace with real API call:
  // const res = await fetch(`${BASE_URL}/api/accounts/${accountId}`, { headers: authHeaders() });
  // if (!res.ok) return null;
  // return res.json();

  // Mock: same data regardless of accountId for now
  const dashboard = await getDashboard();
  const account =
    dashboard.registeredAccounts.find((a) => a.id === accountId) ?? null;

  if (!account) return null;

  return {
    account,
    sectors: [
      { name: 'Technology', pct: 42, color: '#6750a4' },
      { name: 'Finance', pct: 28, color: '#b0c4de' },
      { name: 'Healthcare', pct: 15, color: '#938f99' },
      { name: 'Energy', pct: 10, color: '#cac4d0' },
      { name: 'Consumer Discretionary', pct: 5, color: '#1c1b1f' },
    ],
    geoAllocations: [
      { name: 'USA', pct: 60, color: '#6750a4' },
      { name: 'Canada', pct: 25, color: '#b0c4de' },
      { name: 'International', pct: 15, color: '#cac4d0' },
    ],
    recentActivity: [
      {
        id: 'act-001',
        icon: 'add',
        title: 'Dividend Reinvestment',
        sub: 'Oct 12, 2023 · VFV.TO',
        amount: '+$142.20',
        positive: true,
      },
      {
        id: 'act-002',
        icon: 'shopping-bag',
        title: 'Buy Order Executed',
        sub: 'Oct 08, 2023 · AAPL (5 shares)',
        amount: '-$890.45',
        positive: false,
      },
      {
        id: 'act-003',
        icon: 'account-balance',
        title: 'Contribution',
        sub: 'Sep 28, 2023 · From Main Ledger',
        amount: '+$1,500.00',
        positive: true,
      },
    ],
  };
}

// ─── Subscriptions ────────────────────────────────────────────────────────────

/**
 * Cancel a subscription for the authenticated user.
 * TODO: DELETE /api/subscriptions/:subscriptionId
 */
export async function cancelSubscription(subscriptionId: string): Promise<void> {
  // TODO: replace with real API call:
  // await fetch(`${BASE_URL}/api/subscriptions/${subscriptionId}`, {
  //   method: 'DELETE',
  //   headers: authHeaders(),
  // });

  console.log(`[mock] cancelSubscription called for: ${subscriptionId}`);
}

/**
 * Execute an auto-savings or recommended action.
 * TODO: POST /api/actions/:actionId/execute
 */
export async function executeAction(actionId: string): Promise<void> {
  // TODO: replace with real API call:
  // await fetch(`${BASE_URL}/api/actions/${actionId}/execute`, {
  //   method: 'POST',
  //   headers: authHeaders(),
  // });

  console.log(`[mock] executeAction called for: ${actionId}`);
}
