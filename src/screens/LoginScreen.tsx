import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows, gradients, blur } from '../design-system/tokens';
import Button from '../components/Button';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const { colors, activeTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Home');
    }, 1000);
  };

  const handleGuestLogin = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={activeTheme === 'dark' 
          ? ['#000000', '#1C1C1E', '#2C2C2E']
          : ['#007AFF', '#0A84FF', '#AF52DE']}
        style={styles.background}
      >
        {/* Floating Orbs - iOS style */}
        <View style={[styles.orb, styles.orb1, { 
          backgroundColor: activeTheme === 'dark' ? 'rgba(10, 132, 255, 0.3)' : 'rgba(255, 255, 255, 0.3)' 
        }]} />
        <View style={[styles.orb, styles.orb2, {
          backgroundColor: activeTheme === 'dark' ? 'rgba(191, 90, 242, 0.2)' : 'rgba(255, 255, 255, 0.2)'
        }]} />
        <View style={[styles.orb, styles.orb3, {
          backgroundColor: activeTheme === 'dark' ? 'rgba(255, 55, 95, 0.2)' : 'rgba(255, 255, 255, 0.15)'
        }]} />
      </LinearGradient>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo */}
            <View style={styles.logoContainer}>
              <BlurView
                intensity={blur.prominent}
                tint={activeTheme === 'dark' ? 'dark' : 'light'}
                style={styles.logoBlur}
              >
                <Text style={styles.logoIcon}>🎓</Text>
              </BlurView>
              <Text style={[styles.appName, typography.h1, { color: colors.textInverse }]}>
                IT Exam Certification
              </Text>
              <Text style={[styles.tagline, typography.body, { color: 'rgba(255,255,255,0.8)' }]}>
                Premium Exam Preparation
              </Text>
            </View>

            {/* Glass Card */}
            <BlurView
              intensity={blur.prominent}
              tint={activeTheme === 'dark' ? 'dark' : 'light'}
              style={[styles.glassCard, shadows.xl]}
            >
              <Text style={[styles.welcomeTitle, typography.h2, { color: colors.textPrimary }]}>
                Welcome Back
              </Text>
              <Text style={[styles.welcomeSubtitle, typography.caption, { color: colors.textSecondary }]}>
                Sign in to continue your learning journey
              </Text>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, typography.captionBold, { color: colors.textPrimary }]}>
                    Email
                  </Text>
                  <BlurView
                    intensity={blur.light}
                    tint={activeTheme === 'dark' ? 'dark' : 'light'}
                    style={[styles.inputBlur, { borderColor: colors.border }]}
                  >
                    <TextInput
                      style={[styles.input, typography.body, { color: colors.textPrimary }]}
                      placeholder="your@email.com"
                      placeholderTextColor={colors.textTertiary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </BlurView>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, typography.captionBold, { color: colors.textPrimary }]}>
                    Password
                  </Text>
                  <BlurView
                    intensity={blur.light}
                    tint={activeTheme === 'dark' ? 'dark' : 'light'}
                    style={[styles.inputBlur, { borderColor: colors.border }]}
                  >
                    <TextInput
                      style={[styles.input, typography.body, { color: colors.textPrimary }]}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.textTertiary}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoComplete="password"
                    />
                  </BlurView>
                </View>

                <Button
                  title="Sign In"
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  fullWidth
                  style={{ marginTop: spacing.lg }}
                />
              </View>

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, typography.caption, { color: colors.textTertiary }]}>
                  or
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <Button
                title="Continue as Guest"
                onPress={handleGuestLogin}
                variant="outline"
                size="large"
                fullWidth
              />
            </BlurView>

            {/* Features */}
            <View style={styles.featuresContainer}>
              {['200+ Questions', 'Progress Tracking', 'Certification Ready'].map((feature, index) => (
                <BlurView
                  key={index}
                  intensity={blur.regular}
                  tint={activeTheme === 'dark' ? 'dark' : 'light'}
                  style={[styles.featureItem, shadows.md]}
                >
                  <Text style={[styles.featureText, typography.small, { color: colors.textInverse }]}>
                    {feature}
                  </Text>
                </BlurView>
              ))}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
  },
  orb1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  orb2: {
    width: 400,
    height: 400,
    bottom: -150,
    left: -150,
  },
  orb3: {
    width: 200,
    height: 200,
    top: '40%',
    right: -50,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoBlur: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoIcon: {
    fontSize: 50,
  },
  appName: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
  },
  glassCard: {
    borderRadius: radius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  welcomeTitle: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    marginBottom: spacing.sm,
  },
  inputBlur: {
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 52,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: spacing.lg,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.md,
  },
  featureItem: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
