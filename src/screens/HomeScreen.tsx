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
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>IT Exam Certification</Text>
            <Text style={styles.subtitle}>
              IT sertifikalarında ustalaşın
            </Text>
          </View>

          {/* İstatistikler */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statNumber}>{stats.examsCompleted}</Text>
              <Text style={styles.statLabel}>Tamamlanan</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={styles.statNumber}>{stats.averageScore}%</Text>
              <Text style={styles.statLabel}>Ort. Puan</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>❓</Text>
              <Text style={styles.statNumber}>{stats.totalQuestions}</Text>
              <Text style={styles.statLabel}>Soru</Text>
            </View>
          </View>

          {/* Ana Buton */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('ExamList')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#f093fb', '#f5576c']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.primaryButtonIcon}>🚀</Text>
              <Text style={styles.primaryButtonText}>Sınava Başla</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Sertifikalar */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Mevcut Sertifikalar</Text>
            
            <View style={styles.featureGrid}>
              <View style={styles.featureCard}>
                <Text style={styles.featureCardIcon}>☁️</Text>
                <Text style={styles.featureCardTitle}>AWS</Text>
                <Text style={styles.featureCardDesc}>Cloud Computing</Text>
              </View>

              <View style={styles.featureCard}>
                <Text style={styles.featureCardIcon}>☁️</Text>
                <Text style={styles.featureCardTitle}>Google Cloud</Text>
                <Text style={styles.featureCardDesc}>GCP</Text>
              </View>

              <View style={styles.featureCard}>
                <Text style={styles.featureCardIcon}>🐳</Text>
                <Text style={styles.featureCardTitle}>Kubernetes</Text>
                <Text style={styles.featureCardDesc}>Container Orchestration</Text>
              </View>

              <View style={styles.featureCard}>
                <Text style={styles.featureCardIcon}>🛡️</Text>
                <Text style={styles.featureCardTitle}>Security+</Text>
                <Text style={styles.featureCardDesc}>Cybersecurity</Text>
              </View>
            </View>
          </View>

          {/* Ayarlar Butonu */}
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.settingsButtonText}>⚙️  Ayarlar</Text>
          </TouchableOpacity>
        </ScrollView>
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  primaryButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 10,
  },
  primaryButtonIcon: {
    fontSize: 24,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: (width - 52) / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featureCardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  featureCardDesc: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  settingsButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  settingsButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

