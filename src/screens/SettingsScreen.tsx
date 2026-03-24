import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <MaterialIcons name="bubble-chart" size={22} color={colors.primaryContainer} />
        <Text style={styles.logoText}>SYNERGY</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.sub}>Preferences &amp; account management.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 24, paddingVertical: 16 },
  logoText: { fontSize: 18, fontWeight: '900', letterSpacing: 2, color: colors.primaryContainer },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', color: colors.onSurface },
  sub: { fontSize: 15, color: colors.onSurfaceVariant, marginTop: 8 },
});
