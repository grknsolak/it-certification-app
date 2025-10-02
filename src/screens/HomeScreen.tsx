import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, ExamResult } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, typography, radius, shadows, gradients } from '../design-system/tokens';
import Button from '../components/Button';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

interface Stats {
  examsCompleted: number;
  averageScore: number;
  totalQuestions: number;
}

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const { colors, activeTheme } = useTheme();
  const [stats, setStats] = useState<Stats>({
    examsCompleted: 0,
    averageScore: 0,
    totalQuestions: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const resultsJson = await AsyncStorage.getItem('examResults');
      if (resultsJson) {
        const results: ExamResult[] = JSON.parse(resultsJson);
        const totalScore = results.reduce((sum, r) => sum + r.score, 0);
        const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
        
        setStats({
          examsCompleted: results.length,
          averageScore: results.length > 0 ? Math.round(totalScore / results.length) : 0,
          totalQuestions,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={activeTheme === 'dark' ? ['#1e293b', '#0f172a'] : gradients.primary}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={[styles.greeting, typography.caption]}>Merhaba! 👋</Text>
            <Text style={[styles.title, typography.h1]}>IT Exam Master</Text>
            <Text style={[styles.subtitle, typography.body]}>
              IT sertifikalarında ustalaşın
            </Text>
          </View>

          {/* Stats Cards - YENI TASARIM! */}
          <View style={styles.statsContainer}>
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.2)', 'rgba(5, 150, 105, 0.2)']}
              style={[styles.statCard, { borderColor: 'rgba(255,255,255,0.3)' }]}
            >
              <Text style={styles.statIcon}>✅</Text>
              <Text style={[styles.statNumber, typography.h2]}>{stats.examsCompleted}</Text>
              <Text style={[styles.statLabel, typography.caption]}>Tamamlanan</Text>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(245, 158, 11, 0.2)', 'rgba(217, 119, 6, 0.2)']}
              style={[styles.statCard, { borderColor: 'rgba(255,255,255,0.3)' }]}
            >
              <Text style={styles.statIcon}>📊</Text>
              <Text style={[styles.statNumber, typography.h2]}>{stats.averageScore}%</Text>
              <Text style={[styles.statLabel, typography.caption]}>Ort. Puan</Text>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(59, 130, 246, 0.2)', 'rgba(37, 99, 235, 0.2)']}
              style={[styles.statCard, { borderColor: 'rgba(255,255,255,0.3)' }]}
            >
              <Text style={styles.statIcon}>❓</Text>
              <Text style={[styles.statNumber, typography.h2]}>{stats.totalQuestions}</Text>
              <Text style={[styles.statLabel, typography.caption]}>Soru</Text>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Ana Buton - BOMBA! */}
        <Button
          title="Sınava Başla"
          onPress={() => navigation.navigate('ExamList')}
          variant="primary"
          size="large"
          fullWidth
          icon="🚀"
          style={styles.primaryButton}
          accessibilityLabel="Yeni sınava başla"
        />

        {/* Sertifikalar Grid - YENİ! */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, typography.h3, { color: colors.textPrimary }]}>
            Mevcut Sertifikalar
          </Text>
          
          <View style={styles.certGrid}>
            <LinearGradient
              colors={gradients.blue}
              style={[styles.certCard, shadows.md]}
            >
              <Text style={styles.certIcon}>☁️</Text>
              <Text style={[styles.certTitle, typography.bodyBold]}>AWS</Text>
              <Text style={[styles.certDesc, typography.small]}>Cloud Computing</Text>
              <View style={styles.certBadge}>
                <Text style={[styles.certBadgeText, typography.small]}>8 Sınav</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={gradients.purple}
              style={[styles.certCard, shadows.md]}
            >
              <Text style={styles.certIcon}>☁️</Text>
              <Text style={[styles.certTitle, typography.bodyBold]}>Google Cloud</Text>
              <Text style={[styles.certDesc, typography.small]}>GCP</Text>
              <View style={styles.certBadge}>
                <Text style={[styles.certBadgeText, typography.small]}>2 Sınav</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={['#34d399', '#10b981']}
              style={[styles.certCard, shadows.md]}
            >
              <Text style={styles.certIcon}>🐳</Text>
              <Text style={[styles.certTitle, typography.bodyBold]}>Kubernetes</Text>
              <Text style={[styles.certDesc, typography.small]}>Container</Text>
              <View style={styles.certBadge}>
                <Text style={[styles.certBadgeText, typography.small]}>1 Sınav</Text>
              </View>
            </LinearGradient>

            <LinearGradient
              colors={gradients.error}
              style={[styles.certCard, shadows.md]}
            >
              <Text style={styles.certIcon}>🛡️</Text>
              <Text style={[styles.certTitle, typography.bodyBold]}>Security+</Text>
              <Text style={[styles.certDesc, typography.small]}>Cybersecurity</Text>
              <View style={styles.certBadge}>
                <Text style={[styles.certBadgeText, typography.small]}>1 Sınav</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, typography.h3, { color: colors.textPrimary }]}>
            Hızlı Erişim
          </Text>
          
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: colors.surface }]}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: colors.primaryLight }]}>
              <Text style={styles.actionIcon}>⚙️</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, typography.bodyBold, { color: colors.textPrimary }]}>
                Ayarlar
              </Text>
              <Text style={[styles.actionDesc, typography.caption, { color: colors.textSecondary }]}>
                Tema ve tercihlerinizi yönetin
              </Text>
            </View>
            <Text style={[styles.actionArrow, { color: colors.textTertiary }]}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.xl,
    paddingTop: spacing.lg,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.xs,
  },
  title: {
    color: '#ffffff',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    ...shadows.md,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  statNumber: {
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: spacing.xs / 2,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  primaryButton: {
    marginBottom: spacing.xxxl,
  },
  section: {
    marginBottom: spacing.xxxl,
  },
  sectionTitle: {
    marginBottom: spacing.lg,
  },
  certGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  certCard: {
    width: (width - spacing.xl * 2 - spacing.lg) / 2,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  certIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  certTitle: {
    color: '#ffffff',
    marginBottom: spacing.xs / 2,
    textAlign: 'center',
  },
  certDesc: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  certBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.full,
  },
  certBadgeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: radius.lg,
    ...shadows.sm,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  actionIcon: {
    fontSize: 28,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: spacing.xs / 2,
  },
  actionDesc: {},
  actionArrow: {
    fontSize: 24,
    fontWeight: '300',
  },
});
