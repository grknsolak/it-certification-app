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
      {/* Modern Header */}
      <LinearGradient
        colors={isPassed ? ['#667eea', '#764ba2'] : ['#f093fb', '#f5576c']}
        style={styles.modernHeader}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <Text style={styles.headerEmoji}>{isPassed ? '🎉' : '📚'}</Text>
            <Text style={styles.headerTitle}>
              {isPassed ? 'Sınav Tamamlandı!' : 'Sınav Sonucu'}
            </Text>
            <Text style={styles.headerSubtitle}>{exam?.title}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Skor Özeti - Modern Card */}
        <View style={styles.summaryCard}>
          <View style={styles.scoreRow}>
            <View style={styles.scoreMain}>
              <Text style={styles.scoreLabel}>Puanınız</Text>
              <LinearGradient
                colors={getScoreColor(result.score) as any}
                style={styles.compactScoreCircle}
              >
                <Text style={styles.compactScoreText}>{result.score}%</Text>
              </LinearGradient>
            </View>
            <View style={[styles.statusBadge, isPassed ? styles.passedBadge : styles.failedBadge]}>
              <Text style={[styles.statusText, isPassed ? styles.passedText : styles.failedText]}>
                {isPassed ? '✅ GEÇTİ' : '❌ KALDI'}
              </Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          {/* Sınav İstatistikleri */}
          <View style={styles.statsCompact}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.correctAnswers}</Text>
              <Text style={styles.statLabelSmall}>Doğru</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: '#ef4444' }]}>{result.wrongAnswers}</Text>
              <Text style={styles.statLabelSmall}>Yanlış</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{result.totalQuestions}</Text>
              <Text style={styles.statLabelSmall}>Toplam</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{formatTime(result.timeSpent)}</Text>
              <Text style={styles.statLabelSmall}>Süre</Text>
            </View>
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
            onPress={() => navigation.navigate('ExamList', { category: 'All Certifications' })}
          >
            <Text style={styles.actionButtonText}>🔄 Başka Sınav Dene</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CategorySelection')}
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
  modernHeader: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerEmoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  summaryCard: {
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
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreMain: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 12,
  },
  compactScoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  compactScoreText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },
  statsCompact: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabelSmall: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
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

