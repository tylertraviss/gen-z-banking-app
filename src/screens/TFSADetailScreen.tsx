import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

function SynergyHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={headerStyles.header}>
      <TouchableOpacity onPress={onBack} style={headerStyles.backBtn} activeOpacity={0.7}>
        <MaterialIcons name="arrow-back-ios" size={18} color={colors.primary} />
      </TouchableOpacity>
      <MaterialIcons name="bubble-chart" size={22} color={colors.primaryContainer} />
      <Text style={headerStyles.logoText}>SYNERGY</Text>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 24, paddingVertical: 16,
  },
  backBtn: { marginRight: 4, padding: 4 },
  logoText: {
    fontSize: 18, fontWeight: '900', letterSpacing: 2,
    color: colors.primaryContainer,
  },
});

const { width } = Dimensions.get('window');

const timeRanges = ['1M', '6M', '1Y', 'ALL'];

const sectors = [
  { name: 'Technology', pct: 42, color: colors.primary },
  { name: 'Finance', pct: 28, color: colors.primaryContainer },
  { name: 'Healthcare', pct: 15, color: colors.outline },
  { name: 'Energy', pct: 10, color: colors.outlineVariant },
  { name: 'Consumer Discretionary', pct: 5, color: colors.surfaceDim },
];

const geoData = [
  { name: 'USA', pct: 60, color: colors.primary },
  { name: 'Canada', pct: 25, color: colors.primaryContainer },
  { name: 'International', pct: 15, color: colors.outlineVariant },
];

const activity = [
  {
    icon: 'add' as const,
    title: 'Dividend Reinvestment',
    sub: 'Oct 12, 2023 · VFV.TO',
    amount: '+$142.20',
    positive: true,
  },
  {
    icon: 'shopping-bag' as const,
    title: 'Buy Order Executed',
    sub: 'Oct 08, 2023 · AAPL (5 shares)',
    amount: '-$890.45',
    positive: false,
  },
  {
    icon: 'account-balance' as const,
    title: 'Contribution',
    sub: 'Sep 28, 2023 · From Main Ledger',
    amount: '+$1,500.00',
    positive: true,
  },
];

// Donut segment helpers
const DONUT_R = 15.915;
const DONUT_CIRC = 2 * Math.PI * DONUT_R;

function donutDashArray(pct: number) {
  return `${(pct / 100) * DONUT_CIRC} ${DONUT_CIRC}`;
}

function donutOffset(startPct: number) {
  return -((startPct / 100) * DONUT_CIRC);
}

export default function TFSADetailScreen() {
  const [activeRange, setActiveRange] = useState('1Y');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <SynergyHeader onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.heroSection}>
          <View style={styles.heroLabel}>
            <MaterialIcons name="verified" size={14} color={colors.primary} />
            <Text style={styles.heroLabelText}>TAX-FREE SAVINGS ACCOUNT</Text>
          </View>
          <Text style={styles.balance}>$84,290.42</Text>
          <View style={styles.heroStats}>
            <View style={styles.gainBadge}>
              <MaterialIcons name="trending-up" size={12} color={colors.onTertiaryFixedVariant} />
              <Text style={styles.gainBadgeText}>+12.4% THIS YEAR</Text>
            </View>
            <Text style={styles.gainSub}>+$9,340.12 total gains</Text>
          </View>
        </View>

        {/* Growth Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historical Growth</Text>
          <Text style={styles.cardSub}>Portfolio Performance</Text>

          <View style={styles.chartContainer}>
            {/* Y-axis */}
            <View style={styles.yAxis}>
              {['$90k', '$70k', '$50k', ''].map((l, i) => (
                <Text key={i} style={styles.axisLabel}>{l}</Text>
              ))}
            </View>
            {/* SVG Chart */}
            <View style={styles.svgWrap}>
              <Svg width="100%" height={200} viewBox="0 0 1000 300" preserveAspectRatio="none">
                <Defs>
                  <SvgGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0%" stopColor="#451ebb" stopOpacity={0.1} />
                    <Stop offset="100%" stopColor="#451ebb" stopOpacity={0} />
                  </SvgGradient>
                </Defs>
                <Path
                  d="M0,250 Q100,230 200,190 T400,150 T600,100 T800,130 T1000,40 L1000,300 L0,300 Z"
                  fill="url(#cg)"
                />
                <Path
                  d="M0,250 Q100,230 200,190 T400,150 T600,100 T800,130 T1000,40"
                  fill="none"
                  stroke="#451ebb"
                  strokeWidth={3}
                  strokeLinecap="round"
                />
                <Circle cx={1000} cy={40} r={4} fill="#451ebb" />
                <Circle cx={1000} cy={40} r={10} fill="#451ebb" fillOpacity={0.2} />
              </Svg>
              {/* X-axis */}
              <View style={styles.xAxis}>
                {['1Y AGO', '6M AGO', 'CURRENT'].map((l) => (
                  <Text key={l} style={styles.axisLabel}>{l}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Time Range + Risk */}
          <View style={styles.chartFooter}>
            <View style={styles.rangePills}>
              {timeRanges.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.rangePill, activeRange === r && styles.rangePillActive]}
                  onPress={() => setActiveRange(r)}
                >
                  <Text style={[styles.rangePillText, activeRange === r && styles.rangePillTextActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.riskRow}>
              <MaterialIcons name="warning" size={18} color={colors.onSurfaceVariant} />
              <Text style={styles.riskText}>
                Risk Level: <Text style={{ color: colors.onSurface, fontWeight: '700' }}>Medium</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Sector Exposure */}
        <View style={[styles.card, { backgroundColor: colors.surfaceContainerLow }]}>
          <Text style={styles.cardTitle}>Sector Exposure</Text>
          <View style={styles.sectorList}>
            {sectors.map((s) => (
              <View key={s.name} style={styles.sectorRow}>
                <View style={styles.sectorLabelRow}>
                  <Text style={styles.sectorName}>{s.name}</Text>
                  <Text style={styles.sectorPct}>{s.pct}%</Text>
                </View>
                <View style={styles.barBg}>
                  <View style={[styles.barFill, { width: `${s.pct}%`, backgroundColor: s.color }]} />
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.detailLink}>
            <Text style={styles.detailLinkText}>Detailed Asset List</Text>
            <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Geographic Allocation */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Geographic Allocation</Text>
          <View style={styles.geoRow}>
            {/* Donut */}
            <View style={styles.donutWrap}>
              <Svg width={120} height={120} viewBox="0 0 36 36" style={{ transform: [{ rotate: '-90deg' }] }}>
                {/* Background ring */}
                <Circle cx={18} cy={18} r={DONUT_R} fill="transparent" stroke={colors.surfaceContainerLow} strokeWidth={3} />
                {/* USA */}
                <Circle
                  cx={18} cy={18} r={DONUT_R} fill="transparent"
                  stroke={colors.primary} strokeWidth={3}
                  strokeDasharray={donutDashArray(60)}
                  strokeDashoffset={donutOffset(0)}
                />
                {/* Canada */}
                <Circle
                  cx={18} cy={18} r={DONUT_R} fill="transparent"
                  stroke={colors.primaryContainer} strokeWidth={3}
                  strokeDasharray={donutDashArray(25)}
                  strokeDashoffset={donutOffset(60)}
                />
                {/* International */}
                <Circle
                  cx={18} cy={18} r={DONUT_R} fill="transparent"
                  stroke={colors.outlineVariant} strokeWidth={3}
                  strokeDasharray={donutDashArray(15)}
                  strokeDashoffset={donutOffset(85)}
                />
              </Svg>
              <View style={styles.donutCenter}>
                <Text style={styles.donutCenterTextSm}>Global</Text>
                <Text style={styles.donutCenterTextSm}>Mix</Text>
              </View>
            </View>
            {/* Legend */}
            <View style={styles.geoLegend}>
              {geoData.map((g) => (
                <View key={g.name} style={styles.geoLegendRow}>
                  <View style={styles.geoLegendRowLeft}>
                    <View style={[styles.dot, { backgroundColor: g.color }]} />
                    <Text style={styles.geoLegendName}>{g.name}</Text>
                  </View>
                  <Text style={styles.geoLegendPct}>{g.pct}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={[styles.card, { marginBottom: 24 }]}>
          <View style={styles.activityHeader}>
            <Text style={styles.cardTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {activity.map((item, i) => (
            <View key={i} style={[styles.activityItem, i < activity.length - 1 && styles.activityDivider]}>
              <View style={styles.activityIconWrap}>
                <MaterialIcons name={item.icon} size={20} color={colors.primary} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySub}>{item.sub}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.activityAmount, item.positive && { color: colors.tertiary }]}>
                  {item.amount}
                </Text>
                <Text style={styles.activityStatus}>COMPLETED</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  scroll: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 100 },

  // Hero
  heroSection: { marginBottom: 24, alignItems: 'center', paddingTop: 8 },
  heroLabel: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  heroLabelText: {
    fontSize: 11, fontWeight: '700', color: colors.onSurfaceVariant,
    letterSpacing: 1.5, textTransform: 'uppercase',
  },
  balance: { fontSize: 52, fontWeight: '800', color: colors.onSurface, letterSpacing: -2, marginBottom: 16, textAlign: 'center' },
  heroStats: { alignItems: 'center', gap: 8, marginBottom: 24 },
  gainBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.tertiaryFixed, paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 999,
  },
  gainBadgeText: { fontSize: 11, fontWeight: '700', color: colors.onTertiaryFixedVariant },
  gainSub: { fontSize: 13, fontWeight: '500', color: colors.onSurfaceVariant },

  // Cards
  card: {
    backgroundColor: colors.surfaceContainerLowest, borderRadius: 20,
    padding: 24, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 20, shadowOffset: { width: 0, height: 10 },
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: colors.onSurface, marginBottom: 4 },
  cardSub: { fontSize: 13, color: colors.onSurfaceVariant, marginBottom: 20 },

  // Chart
  chartContainer: { flexDirection: 'row', height: 220, marginBottom: 16 },
  yAxis: { justifyContent: 'space-between', paddingVertical: 8, marginRight: 8, width: 36 },
  axisLabel: { fontSize: 10, fontWeight: '700', color: colors.onSurfaceVariant + '66' },
  svgWrap: { flex: 1 },
  xAxis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  chartFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.surfaceContainerLow,
  },
  rangePills: {
    flexDirection: 'row', backgroundColor: colors.surfaceContainerLow,
    borderRadius: 999, padding: 4, gap: 2,
  },
  rangePill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 999 },
  rangePillActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  rangePillText: { fontSize: 11, fontWeight: '700', color: colors.onSurfaceVariant },
  rangePillTextActive: { color: colors.primary },
  riskRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  riskText: { fontSize: 13, fontWeight: '600', color: colors.onSurfaceVariant },

  // Sectors
  sectorList: { gap: 16, marginBottom: 20 },
  sectorRow: { gap: 6 },
  sectorLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  sectorName: { fontSize: 13, fontWeight: '700', color: colors.onSurface },
  sectorPct: { fontSize: 13, fontWeight: '500', color: colors.onSurfaceVariant },
  barBg: { height: 10, backgroundColor: colors.surfaceContainerHighest, borderRadius: 999, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 999 },
  detailLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 },
  detailLinkText: { fontSize: 13, fontWeight: '700', color: colors.primary },

  // Geo
  geoRow: { flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 8 },
  donutWrap: { position: 'relative', width: 120, height: 120, alignItems: 'center', justifyContent: 'center' },
  donutCenter: { position: 'absolute', alignItems: 'center' },
  donutCenterTextSm: { fontSize: 10, fontWeight: '700', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5 },
  geoLegend: { flex: 1, gap: 12 },
  geoLegendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  geoLegendRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  geoLegendName: { fontSize: 14, fontWeight: '500', color: colors.onSurface },
  geoLegendPct: { fontSize: 14, fontWeight: '700', color: colors.onSurface },

  // Activity
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  viewAll: { fontSize: 13, fontWeight: '700', color: colors.onSurfaceVariant },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  activityDivider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.surfaceContainerLow },
  activityIconWrap: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center', justifyContent: 'center',
  },
  activityInfo: { flex: 1 },
  activityTitle: { fontSize: 13, fontWeight: '700', color: colors.onSurface },
  activitySub: { fontSize: 11, color: colors.onSurfaceVariant, marginTop: 2 },
  activityAmount: { fontSize: 13, fontWeight: '700', color: colors.onSurface },
  activityStatus: { fontSize: 10, fontWeight: '700', color: colors.onSurfaceVariant, letterSpacing: 1, marginTop: 2 },
});
