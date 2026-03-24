import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const memberImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB3LY8PeSYGc1uPzMb_B8bsFH6F3dv_x-vQfXwPBov1Bcq_N-7mORVKiYFUxpKRy30ea7BimHGvnjOEjqbBTt0-fxOcq8DiZ668yV9TlmDlLmyrsuvkYJ0bPVFBF5mFxuYmHjQQ6h_aEGBHcp_hUleBM1G3b_JliPgsKdUuBV9-CWblCEADouhf9G3jY82FK22ea2_6bFOP3eaA4ejP57lQfGGk-1zsNQJFmcrcTJvmhq-IC9-TA722CzGNfNcsHD1C4CvpCjgPyW0',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDqur-msHKN8QGEWxRluUUNvGD4tDeupuQpW-YCgGDiIWHkGdvsuy6bHf7crgTFV87sCbXz91ZLOrINuPv12Zy0s1Ub8PxZ5D0wmYiiis7bQD6RNjcIoM7153mfrV5hCIMgsUmtsPBVCKI6C-4JdR4ntGqCE0Y7cPwCHaT2StZmlfT5j0ZVK0fV5VMSWwFglMdwUoBa84ZkQcqOLdxXRopR8RbbKTcQHqyf2G6D_KTk5UVNCegzegnLt8th6z8IBY6wG6vPuBLS2bA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAG-BN2OzVjwyjHAWB44XrFPPBqmH9ggDtunvkoH-0tq2lsjCeuGFDRGd4O8xKd4IxpmBwUnpP2WaB5xWlxqKA2Qp1PnV0nYpk_hqPYZuBqUX5aoM1s5tROu7NxZwp0M0ARmpo4w-y9qm2pP0KfgQk_JPyvpr_FgPGPJuU49mm6LAlsoB1TvQNy5SH13ue8RBZv-OhXzSJ4lrO4aHBdEaWURvaxX1mDMxP2jCBmAPnvYEpyCk5IC4V2naFgoLQ0ZRbnycinCemWwJM',
];

const stats = [
  { icon: 'sync' as const, label: 'Sync Status', value: 'All Members Active', iconColor: colors.primary },
  { icon: 'verified' as const, label: 'Next Milestone', value: 'Airfare Locked', iconColor: colors.tertiary },
  { icon: 'notifications-active' as const, label: 'Recent Activity', value: 'Marcus added $40', iconColor: colors.onSurfaceVariant },
];

const rules = [
  { label: 'Your Rule', value: 'Round-ups only', accent: colors.primary },
  { label: "Alex's Rule", value: '$50 / week', accent: colors.tertiary },
];

export default function SquadVaultsScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Iceland Trip Vault Card */}
        <View style={styles.vaultCard}>
          {/* Header */}
          <View style={styles.vaultHeader}>
            <View>
              <Text style={styles.vaultTitle}>Iceland Trip 2026</Text>
              <Text style={styles.vaultSubtitle}>Summer solstice expedition</Text>
            </View>
            {/* Member avatars */}
            <View style={styles.avatarStack}>
              {memberImages.map((uri, i) => (
                <Image
                  key={i}
                  source={{ uri }}
                  style={[styles.avatar, { marginLeft: i === 0 ? 0 : -12, zIndex: memberImages.length - i }]}
                />
              ))}
              <View style={[styles.avatar, styles.avatarExtra, { marginLeft: -12 }]}>
                <Text style={styles.avatarExtraText}>+2</Text>
              </View>
            </View>
          </View>

          {/* Hero image with progress overlay */}
          <View style={styles.heroImgWrap}>
            <Image
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMlto1vTpwaoSUxEEPm7rnv96mc1sdHhSlitm-IpdmvzNV32cOSRQnCau_RL6jb9chmOGZShqtku0BaMSncH-Fe44iXBAAvZB7wyBQtNLmBh9NBTWW5yNjYVZByoXNCbOo0tVU4demBq1BBDS9ahJvDUZRUNP_zy1Qk4dVdl48txJhjHJ1cVmpYZmwv8tS9FxmpMlSeYuWkxaE-eS0dcoEQ02ZI0JsUOor1GKk6Mar2nLLazFXmtUIHmGPJ4HsG6KzvRF3sApBjGY' }}
              style={styles.heroImg}
              resizeMode="cover"
            />
            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              style={styles.heroOverlay}
            >
              <View style={styles.progressInfo}>
                <View style={styles.progressLabelRow}>
                  <Text style={styles.progressLabel}>$8,420 saved</Text>
                  <Text style={styles.progressLabel}>65%</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={styles.progressBarFill} />
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Rules */}
          <View style={styles.rulesRow}>
            {rules.map((r) => (
              <View key={r.label} style={[styles.ruleCard, { borderLeftColor: r.accent }]}>
                <Text style={styles.ruleLabel}>{r.label}</Text>
                <Text style={styles.ruleValue}>{r.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Create Squad CTA */}
        <TouchableOpacity activeOpacity={0.9} style={{ marginBottom: 16 }}>
          <LinearGradient
            colors={['#451ebb', '#5d3fd3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaCard}
          >
            <View style={styles.ctaIconCircle}>
              <MaterialIcons name="add" size={28} color="#fff" />
            </View>
            <Text style={styles.ctaTitle}>Create a new Squad Vault</Text>
            <Text style={styles.ctaBody}>
              Set a collective target, invite friends, and watch your dreams fund themselves.
            </Text>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Get Started</Text>
              <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View key={s.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: colors.surfaceContainerLowest }]}>
                <MaterialIcons name={s.icon} size={20} color={s.iconColor} />
              </View>
              <View>
                <Text style={styles.statLabel}>{s.label}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
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
  scroll: { padding: 20, paddingBottom: 100 },

  // Vault card
  vaultCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 20, padding: 24, marginBottom: 16,
    borderWidth: StyleSheet.hairlineWidth, borderColor: colors.surfaceContainer,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, shadowOffset: { width: 0, height: 4 },
    gap: 20,
  },
  vaultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  vaultTitle: { fontSize: 22, fontWeight: '700', color: colors.onSurface },
  vaultSubtitle: { fontSize: 14, fontWeight: '500', color: colors.onSurfaceVariant, marginTop: 2 },

  // Avatars
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: colors.surfaceContainerLowest },
  avatarExtra: {
    backgroundColor: colors.primaryContainer,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 0,
  },
  avatarExtraText: { fontSize: 11, fontWeight: '700', color: '#fff' },

  // Hero image
  heroImgWrap: { height: 220, borderRadius: 12, overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%' },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  progressInfo: { gap: 10 },
  progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { color: '#fff', fontWeight: '700', fontSize: 15 },
  progressBarBg: { height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 999, overflow: 'hidden' },
  progressBarFill: { height: '100%', width: '65%', backgroundColor: colors.tertiaryFixedDim, borderRadius: 999 },

  // Rules
  rulesRow: { flexDirection: 'row', gap: 12 },
  ruleCard: {
    flex: 1, backgroundColor: colors.surfaceContainerLow,
    padding: 16, borderRadius: 12, borderLeftWidth: 4,
  },
  ruleLabel: { fontSize: 11, fontWeight: '700', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  ruleValue: { fontSize: 16, fontWeight: '700', color: colors.onSurface },

  // CTA
  ctaCard: { borderRadius: 20, padding: 28 },
  ctaIconCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
  },
  ctaTitle: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 8 },
  ctaBody: { fontSize: 13, color: 'rgba(216,206,255,0.9)', lineHeight: 20, marginBottom: 24, maxWidth: 300 },
  ctaButton: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#fff', paddingHorizontal: 22, paddingVertical: 12,
    borderRadius: 999, alignSelf: 'flex-start',
  },
  ctaButtonText: { fontSize: 12, fontWeight: '700', color: colors.primary, letterSpacing: 1, textTransform: 'uppercase' },

  // Stats
  statsGrid: { gap: 12 },
  statCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: colors.surfaceContainerLow, borderRadius: 16, padding: 20,
  },
  statIcon: {
    width: 48, height: 48, borderRadius: 24,
    alignItems: 'center', justifyContent: 'center',
  },
  statLabel: { fontSize: 11, fontWeight: '700', color: colors.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  statValue: { fontSize: 15, fontWeight: '700', color: colors.onSurface },
});
