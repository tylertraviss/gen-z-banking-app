import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import {
  getDashboard,
  cancelSubscription,
  executeAction,
  type DashboardData,
  type Account,
  type Subscription,
} from '../services/api';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: re-fetch when the user returns to this screen (useFocusEffect)
    getDashboard()
      .then(setDashboard)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !dashboard) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <MaterialIcons name="bubble-chart" size={22} color={colors.primaryContainer} />
            <Text style={styles.logoText}>SYNERGY</Text>
          </View>
        </View>
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const { netWorth, registeredAccounts, nonRegisteredAccounts, unusedSubscriptions } = dashboard;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLogo}>
          <MaterialIcons name="bubble-chart" size={22} color={colors.primaryContainer} />
          <Text style={styles.logoText}>SYNERGY</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Net Worth */}
        <View style={styles.netWorthSection}>
          <Text style={styles.netWorthLabel}>Current Net Worth</Text>
          <Text style={styles.netWorthValue}>{netWorth}</Text>
          <View style={styles.netWorthBar} />
        </View>

        {/* Registered Accounts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Registered Accounts</Text>
            <MaterialIcons name="shield" size={22} color={colors.primary} />
          </View>
          <View style={styles.accountGrid}>
            {registeredAccounts.map((acct: Account) => (
              <TouchableOpacity
                key={acct.id}
                style={styles.accountCard}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('AccountDetail', {
                  type: acct.type,
                  number: acct.number,
                  balance: acct.balance,
                  tag: acct.tag,
                  tagColor: acct.tagColor,
                  gainPct: acct.gainPct,
                  gainAmt: acct.gainAmt,
                  riskLevel: acct.riskLevel,
                })}
              >
                <View>
                  <Text style={styles.accountType}>{acct.type}</Text>
                  <Text style={styles.accountNumber}>{acct.number}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.accountBalance}>{acct.balance}</Text>
                  <Text style={[styles.accountTag, { color: acct.tagColor }]}>{acct.tag}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <LinkAccountButton />
          </View>
        </View>

        {/* Non-Registered Accounts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Non-Registered Accounts</Text>
            <MaterialIcons name="account-balance" size={22} color={colors.primary} />
          </View>
          <View style={styles.accountGrid}>
            {nonRegisteredAccounts.map((acct) => (
              <TouchableOpacity key={acct.id} style={styles.accountCard} activeOpacity={0.8}>
                <View>
                  <Text style={styles.accountType}>{acct.type}</Text>
                  <Text style={styles.accountNumber}>{acct.number}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.accountBalance, acct.balanceColor ? { color: acct.balanceColor } : {}]}>
                    {acct.balance}
                  </Text>
                  <Text style={[styles.accountTag, { color: acct.tagColor }]}>{acct.tag}</Text>
                </View>
              </TouchableOpacity>
            ))}
            <LinkAccountButton />
          </View>
        </View>

        {/* Unused Subscriptions */}
        <View style={[styles.section, styles.subSection]}>
          <View style={styles.subSectionHeader}>
            <View style={styles.subSectionIcon}>
              <MaterialIcons name="notifications-off" size={22} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Unused Subscriptions</Text>
              <Text style={styles.subSectionDesc}>Detecting underutilized capital</Text>
            </View>
          </View>
          <View style={styles.subList}>
            {unusedSubscriptions.map((s: Subscription) => (
              <View
                key={s.id}
                style={[styles.subRow, { backgroundColor: s.bg, borderColor: s.border }]}
              >
                <View>
                  <Text style={[styles.subName, s.action === 'Execute' && { color: colors.tertiary }]}>
                    {s.name}
                  </Text>
                  <Text style={styles.subDesc}>{s.sub}</Text>
                </View>
                <TouchableOpacity
                  style={styles.subAction}
                  activeOpacity={0.8}
                  onPress={() =>
                    s.action === 'Cancel'
                      ? cancelSubscription(s.id)
                      : executeAction(s.id)
                  }
                >
                  <Text style={[styles.subActionText, { color: s.accent }]}>{s.action}</Text>
                  <MaterialIcons name={s.icon} size={14} color={s.accent} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function LinkAccountButton() {
  return (
    <TouchableOpacity style={styles.linkAccountBtn} activeOpacity={0.75}>
      <View style={styles.linkAccountInner}>
        <View style={styles.linkAccountIconWrap}>
          <MaterialIcons name="add" size={18} color="#fff" />
        </View>
        <View>
          <Text style={styles.linkAccountTitle}>Link Account</Text>
          <Text style={styles.linkAccountSub}>Connect a bank or brokerage</Text>
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },

  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  headerLogo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoText: {
    fontSize: 18, fontWeight: '900', letterSpacing: 2,
    color: colors.primaryContainer,
  },

  loadingCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { paddingHorizontal: 20, paddingBottom: 110 },

  netWorthSection: { alignItems: 'center', paddingVertical: 32 },
  netWorthLabel: {
    fontSize: 11, fontWeight: '600', letterSpacing: 3,
    textTransform: 'uppercase', color: colors.secondary, marginBottom: 12,
  },
  netWorthValue: {
    fontSize: 56, fontWeight: '800', letterSpacing: -2.5,
    color: colors.onSurface,
  },
  netWorthBar: {
    width: 48, height: 4, backgroundColor: colors.primary,
    borderRadius: 2, marginTop: 16,
  },

  section: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 20, padding: 24, marginBottom: 16, gap: 16,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: colors.onSurface },

  accountGrid: { gap: 10 },
  accountCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  accountType: {
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5,
    textTransform: 'uppercase', color: colors.secondary, marginBottom: 4,
  },
  accountNumber: { fontSize: 16, fontWeight: '700', color: colors.onSurface },
  accountBalance: { fontSize: 16, fontWeight: '700', color: colors.onSurface },
  accountTag: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', marginTop: 2 },

  linkAccountBtn: {
    backgroundColor: colors.primary + '14',
    borderRadius: 14, borderWidth: 1.5, borderColor: colors.primary + '33',
    paddingVertical: 14, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  linkAccountInner: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  linkAccountIconWrap: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  linkAccountTitle: { fontSize: 14, fontWeight: '700', color: colors.primary },
  linkAccountSub: { fontSize: 11, color: colors.onSurfaceVariant, marginTop: 1 },

  subSection: {
    backgroundColor: 'transparent', paddingHorizontal: 0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outlineVariant + '4D',
    borderRadius: 0, paddingTop: 28, marginBottom: 0,
  },
  subSectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  subSectionIcon: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center', justifyContent: 'center',
  },
  subSectionDesc: { fontSize: 13, color: colors.onSurfaceVariant, marginTop: 2 },
  subList: { gap: 8 },
  subRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 14, borderRadius: 14, borderWidth: StyleSheet.hairlineWidth,
  },
  subName: { fontSize: 14, fontWeight: '700', color: colors.onSurface, marginBottom: 2 },
  subDesc: { fontSize: 12, color: colors.onSurfaceVariant },
  subAction: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subActionText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
});
