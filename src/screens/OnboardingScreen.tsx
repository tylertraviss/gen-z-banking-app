import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

type Props = {
  navigation: { replace: (screen: string) => void };
};

export default function OnboardingScreen({ navigation }: Props) {
  const onGetStarted = () => navigation.replace('Main');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
      Animated.timing(btnAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {/* Background blobs */}
      <View style={styles.blobTopLeft} />
      <View style={styles.blobBottomRight} />

      {/* Abstract SVG pattern */}
      <View style={styles.svgWrap} pointerEvents="none">
        <Svg width={width * 1.2} height={height * 1.2} viewBox="0 0 100 100">
          <Circle cx={10} cy={10} r={15} fill={colors.primary} fillOpacity={0.03} />
          <Circle cx={90} cy={20} r={25} fill={colors.primary} fillOpacity={0.03} />
          <Circle cx={20} cy={80} r={20} fill={colors.primary} fillOpacity={0.03} />
          <Circle cx={85} cy={85} r={30} fill={colors.primary} fillOpacity={0.03} />
          <Circle cx={50} cy={50} r={40} fill={colors.primary} fillOpacity={0.03} />
        </Svg>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.headline}>
            The banking{'\n'}experience,{'\n'}
            <Text style={styles.headlineAccent}>modernized.</Text>
          </Text>
          <Text style={styles.subtitle}>
            Money made simple.{'\n'}Built for how you want to live.
          </Text>
        </Animated.View>

        <Animated.View style={{ opacity: btnAnim, marginTop: 48 }}>
          <TouchableOpacity
            style={styles.cta}
            activeOpacity={0.85}
            onPress={onGetStarted}
          >
            <Text style={styles.ctaText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Terms</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Background decorations
  blobTopLeft: {
    position: 'absolute',
    top: '-10%',
    left: '-10%',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: colors.primaryFixedDim,
    opacity: 0.2,
    // blur not natively supported — approximate with larger, faded shape
  },
  blobBottomRight: {
    position: 'absolute',
    bottom: '-10%',
    right: '-10%',
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: width * 0.25,
    backgroundColor: colors.primaryContainer,
    opacity: 0.08,
  },
  svgWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -(width * 0.6),
    marginTop: -(height * 0.6),
  },

  // Content
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 10,
  },
  headline: {
    fontSize: 52,
    fontWeight: '800',
    lineHeight: 52,
    letterSpacing: -2,
    color: colors.onBackground,
    textAlign: 'center',
    fontFamily: 'System',
  },
  headlineAccent: {
    color: '#5D3FD3',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 17,
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    opacity: 0.8,
    letterSpacing: -0.3,
  },
  cta: {
    backgroundColor: colors.primary,
    paddingHorizontal: 52,
    paddingVertical: 22,
    borderRadius: 999,
    shadowColor: colors.primary,
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  ctaText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    gap: 32,
    paddingBottom: 32,
    zIndex: 10,
  },
  footerLink: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.outline,
    opacity: 0.6,
  },
});
