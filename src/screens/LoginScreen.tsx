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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows, gradients } from '../design-system/tokens';
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
      navigation.replace('CategorySelection');
    }, 1000);
  };

  const handleGuestLogin = () => {
    navigation.replace('CategorySelection');
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient - Bike Shopping Style */}
      <LinearGradient
        colors={activeTheme === 'dark' 
          ? ['#0F172A', '#1E293B']
          : ['#3B82F6', '#8B5CF6']}
        style={styles.background}
      >
        {/* Decorative Circles */}
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
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
              <View style={[styles.logoCircle, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                <Text style={styles.logoIcon}>🎓</Text>
              </View>
              <Text style={[styles.appName, typography.h1, { color: '#ffffff' }]}>
                IT Certification
              </Text>
              <Text style={[styles.tagline, typography.body, { color: 'rgba(255,255,255,0.9)' }]}>
                Your path to certification success
              </Text>
            </View>

            {/* Card - Bike Shopping Style */}
            <View style={[styles.card, { backgroundColor: colors.surface }, shadows.xl]}>
              <Text style={[styles.welcomeTitle, typography.h2, { color: colors.textPrimary }]}>
                Welcome Back! 👋
              </Text>
              <Text style={[styles.welcomeSubtitle, typography.caption, { color: colors.textSecondary }]}>
                Sign in to continue your learning journey
              </Text>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, typography.captionBold, { color: colors.textPrimary }]}>
                    Email Address
                  </Text>
                  <View style={[styles.inputWrapper, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
                    <Text style={styles.inputIcon}>📧</Text>
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
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, typography.captionBold, { color: colors.textPrimary }]}>
                    Password
                  </Text>
                  <View style={[styles.inputWrapper, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={[styles.input, typography.body, { color: colors.textPrimary }]}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.textTertiary}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoComplete="password"
                    />
                  </View>
                </View>

                <Button
                  title="Sign In"
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  fullWidth
                  icon="🚀"
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
                icon="👤"
              />
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              {[
                { icon: '✅', text: '200+ Questions' },
                { icon: '📊', text: 'Track Progress' },
                { icon: '🏆', text: 'Get Certified' },
              ].map((feature, index) => (
                <View
                  key={index}
                  style={[styles.featureItem, { backgroundColor: 'rgba(255, 255, 255, 0.15)' }]}
                >
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text style={[styles.featureText, typography.small, { color: '#ffffff' }]}>
                    {feature.text}
                  </Text>
                </View>
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
  circle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 400,
    height: 400,
    bottom: -150,
    left: -150,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
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
  card: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    minHeight: 52,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
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
    fontWeight: '600',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: spacing.sm,
  },
  featureItem: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  featureText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
