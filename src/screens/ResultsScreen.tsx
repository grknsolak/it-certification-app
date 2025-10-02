import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { certificationExams } from '../data/certificationExams';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

const { width } = Dimensions.get('window');

export default function ResultsScreen({ navigation, route }: Props) {
  const { result } = route.params;
  const exam = certificationExams.find(e => e.id === result.examId);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}d ${secs}s`;
  };

  const getScoreColor = (score: number): string[] => {
    if (score >= 80) return ['#10b981', '#059669'];
    if (score >= 60) return ['#f59e0b', '#d97706'];
    return ['#ef4444', '#dc2626'];
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { emoji: '🎉', text: 'Mükemmel!' };
    if (score >= 80) return { emoji: '👏', text: 'Harika!' };
    if (score >= 70) return { emoji: '👍', text: 'İyi İş!' };
    if (score >= 60) return { emoji: '💪', text: 'Fena Değil!' };
    return { emoji: '📚', text: 'Çalışmaya Devam!' };
  };

  const isPassed = result.score >= (exam?.passingScore || 70);
  const scoreMessage = getScoreMessage(result.score);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isPassed ? ['#10b981', '#059669'] : ['#ef4444', '#dc2626']}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.title}>
              {isPassed ? '🎉 Tebrikler!' : '📚 Çalışmaya Devam!'}
            </Text>
            <Text style={styles.subtitle}>{exam?.title}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Skor Dairesi */}
        <View style={styles.scoreContainer}>
          <LinearGradient
            colors={getScoreColor(result.score)}
            style={styles.scoreCircle}
          >
            <Text style={styles.scorePercentage}>{result.score}%</Text>
          </LinearGradient>
          <Text style={styles.scoreEmoji}>{scoreMessage.emoji}</Text>
          <Text style={styles.scoreMessage}>{scoreMessage.text}</Text>
          <View style={[styles.statusBadge, isPassed ? styles.passedBadge : styles.failedBadge]}>
            <Text style={[styles.statusText, isPassed ? styles.passedText : styles.failedText]}>
              {isPassed ? '✅ GEÇTİ' : '❌ KALDI'}
            </Text>
          </View>
        </View>

        {/* İstatistikler */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <LinearGradient colors={['#10b981', '#059669']} style={styles.statCardGradient}>
              <Text style={styles.statIcon}>✓</Text>
              <Text style={styles.statNumber}>{result.correctAnswers}</Text>
              <Text style={styles.statLabel}>Doğru</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.statCardGradient}>
              <Text style={styles.statIcon}>✗</Text>
              <Text style={styles.statNumber}>{result.wrongAnswers}</Text>
              <Text style={styles.statLabel}>Yanlış</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.statCardGradient}>
              <Text style={styles.statIcon}>📝</Text>
              <Text style={styles.statNumber}>{result.totalQuestions}</Text>
              <Text style={styles.statLabel}>Soru</Text>
            </LinearGradient>
          </View>

          <View style={styles.statCard}>
            <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.statCardGradient}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={styles.statNumberSmall}>{formatTime(result.timeSpent)}</Text>
              <Text style={styles.statLabel}>Süre</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Detaylar */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>📊 Sınav Detayları</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Geçiş Notu</Text>
            <Text style={styles.detailValue}>{exam?.passingScore}%</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Süre Limiti</Text>
            <Text style={styles.detailValue}>{exam?.timeLimit} dk</Text>
          </View>
          <View style={styles.detailDivider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Kategori</Text>
            <Text style={styles.detailValue}>{exam?.category}</Text>
          </View>
        </View>

        {/* Butonlar */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ExamList')}
          >
            <Text style={styles.actionButtonText}>🔄 Başka Sınav Dene</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.actionButtonText}>🏠 Ana Sayfaya Dön</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  headerGradient: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: -60,
    marginBottom: 30,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
  },
  scoreEmoji: {
    fontSize: 50,
    marginTop: 16,
  },
  scoreMessage: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1d1d1f',
    marginTop: 12,
  },
  statusBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  passedBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  failedBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
  },
  passedText: {
    color: '#10b981',
  },
  failedText: {
    color: '#ef4444',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statCardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statNumberSmall: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#1d1d1f',
    fontWeight: '700',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
});

