import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import TFSADetailScreen from '../screens/TFSADetailScreen';
import SquadVaultsScreen from '../screens/SquadVaultsScreen';
import RoastScreen from '../screens/RoastScreen';
import SettingsScreen from '../screens/SettingsScreen';

// ─── Tab Navigator ────────────────────────────────────────────────────────────

const Tab = createBottomTabNavigator();

type TabIconProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  focused: boolean;
};

function TabIcon({ icon, label, focused }: TabIconProps) {
  if (focused) {
    return (
      <View style={styles.activeTab}>
        <MaterialIcons name={icon} size={20} color="#fff" />
        <Text style={styles.activeTabLabel}>{label}</Text>
      </View>
    );
  }
  return (
    <View style={styles.inactiveTab}>
      <MaterialIcons name={icon} size={22} color={colors.onSurface + '66'} />
      <Text style={styles.inactiveTabLabel}>{label}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="home" label="Home" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Vaults"
        component={TFSADetailScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="account-balance-wallet" label="Vaults" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Squad"
        component={SquadVaultsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="group" label="Squad" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Roast"
        component={RoastScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="psychology" label="Roast" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon icon="settings" label="Settings" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

// ─── Root Stack ───────────────────────────────────────────────────────────────

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.outlineVariant + '33',
    height: Platform.OS === 'ios' ? 88 : 72,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingTop: 12,
    shadowColor: '#5D3FD3',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 16,
  },
  activeTab: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabLabel: {
    fontSize: 8, fontWeight: '700', color: '#fff',
    letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2,
  },
  inactiveTab: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  inactiveTabLabel: {
    fontSize: 8, fontWeight: '700', color: colors.onSurface + '66',
    letterSpacing: 0.8, textTransform: 'uppercase', marginTop: 2,
  },
});
