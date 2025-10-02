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
      navigation.replace('Home');
    }, 1000);
  };

  const handleGuestLogin = () => {
    navigation.replace('Home');
  };

  return (
    <LinearGradient
      colors={activeTheme === 'dark' ? ['#1e293b', '#0f172a'] : gradients.primary}
      style={styles.container}
    >
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
            {/* Logo - DAHA BÜYÜK! */}
            <View style={styles.logoContainer}>
              <View style={[styles.logoCircle, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Text style={styles.logoIcon}>🎓</Text>
              </View>
              <Text style={[styles.appName, typography.h1]}>IT Exam Certification</Text>
              <Text style={[styles.tagline, typography.body]}>
                Sertifika yolculuğunuz burada başlıyor
              </Text>
            </View>

            {/* Welcome Card */}
            <View style={[styles.welcomeCard, { backgroundColor: colors.surface }]}>
              <Text style={[styles.welcomeTitle, typography.h2, { color: colors.textPrimary }]}>
                Hoş Geldiniz! 👋
              </Text>
              <Text style={[styles.welcomeSubtitle, typography.body, { color: colors.textSecondary }]}>
                IT sertifikalarınıza hazırlanın
              </Text>

              {/* Form */}
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, typography.captionBold, { color: colors.textPrimary }]}>
                    E-posta
                  </Text>
                  <View style={[styles.inputWrapper, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                    <Text style={styles.inputIcon}>📧</Text>
                    <TextInput
                      style={[styles.input, typography.body, { color: colors.textPrimary }]}
                      placeholder="ornek@email.com"
                      placeholderTextColor={colors.textTertiary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      accessibilityLabel="E-posta adresi"
                    />
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={[styles.inputLabel, typography.captionBold, { color: colors.textPrimary }]}>
                    Şifre
                  </Text>
                  <View style={[styles.inputWrapper, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={[styles.input, typography.body, { color: colors.textPrimary }]}
                      placeholder="••••••••"
                      placeholderTextColor={colors.textTertiary}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoComplete="password"
                      accessibilityLabel="Şifre"
                    />
                  </View>
                </View>

                <Button
                  title="Giriş Yap"
                  onPress={handleLogin}
                  variant="primary"
                  size="large"
                  loading={isLoading}
                  fullWidth
                  icon="🚀"
                  style={{ marginTop: spacing.md }}
                  accessibilityLabel="Giriş yap butonu"
                />
              </View>

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, typography.caption, { color: colors.textSecondary }]}>
                  veya
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <Button
                title="Misafir Olarak Devam Et"
                onPress={handleGuestLogin}
                variant="outline"
                size="large"
                fullWidth
                icon="👤"
                accessibilityLabel="Misafir girişi"
              />
            </View>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <View style={[styles.featureItem, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Text style={styles.featureIcon}>✅</Text>
                <Text style={[styles.featureText, typography.caption]}>200+ Soru</Text>
              </View>
              <View style={[styles.featureItem, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Text style={styles.featureIcon}>📊</Text>
                <Text style={[styles.featureText, typography.caption]}>İlerleme Takibi</Text>
              </View>
              <View style={[styles.featureItem, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Text style={styles.featureIcon}>🏆</Text>
                <Text style={[styles.featureText, typography.caption]}>Sertifika Hazırlığı</Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  logoIcon: {
    fontSize: 60,
  },
  appName: {
    color: '#ffffff',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  welcomeCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.lg,
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
    marginBottom: spacing.lg,
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
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    minHeight: 56,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    minHeight: 44,
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
    gap: spacing.md,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.md,
    ...shadows.sm,
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  featureText: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
});
