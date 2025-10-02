import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Exam } from '../types';
import { certificationExams } from '../data/certificationExams';

type ExamListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExamList'>;

interface Props {
  navigation: ExamListScreenNavigationProp;
}

const categories = ['Tümü', 'Cloud Computing', 'Cybersecurity', 'Container Orchestration', 'DevOps'];

const categoryIcons: { [key: string]: string } = {
  'Tümü': '🎯',
  'Cloud Computing': '☁️',
  'Cybersecurity': '🛡️',
  'Container Orchestration': '🐳',
  'DevOps': '⚙️',
};

export default function ExamListScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');

  const filteredExams = selectedCategory === 'Tümü' 
    ? certificationExams 
    : certificationExams.filter(exam => exam.category === selectedCategory);

  const getDifficultyBadge = (exam: Exam) => {
    const difficulties = exam.questions.map(q => q.difficulty || 'medium');
    const hardCount = difficulties.filter(d => d === 'hard').length;
    const easyCount = difficulties.filter(d => d === 'easy').length;
    
    if (hardCount > exam.questions.length / 2) return { level: 'hard', colors: ['#ef4444', '#dc2626'] };
    if (easyCount > exam.questions.length / 2) return { level: 'easy', colors: ['#10b981', '#059669'] };
    return { level: 'medium', colors: ['#f59e0b', '#d97706'] };
  };

  const renderExamItem = ({ item }: { item: Exam }) => {
    const difficulty = getDifficultyBadge(item);
    
    return (
      <TouchableOpacity
        style={styles.examCard}
        onPress={() => navigation.navigate('Exam', { examId: item.id })}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.95)']}
          style={styles.examCardGradient}
        >
          <View style={styles.examHeader}>
            <View style={styles.examTitleContainer}>
              <Text style={styles.examCategory}>{item.icon} {item.category}</Text>
              <Text style={styles.examTitle}>{item.title}</Text>
            </View>
            <LinearGradient
              colors={difficulty.colors}
              style={styles.difficultyBadge}
            >
              <Text style={styles.difficultyText}>{difficulty.level.toUpperCase()}</Text>
            </LinearGradient>
          </View>
          
          <Text style={styles.examDescription} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.examInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📝</Text>
              <Text style={styles.infoText}>{item.questions.length} Soru</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⏱️</Text>
              <Text style={styles.infoText}>{item.timeLimit} Dk</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🎯</Text>
              <Text style={styles.infoText}>{item.passingScore}% Geçiş</Text>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('Exam', { examId: item.id })}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButtonGradient}
            >
              <Text style={styles.startButtonText}>🚀 Sınava Başla</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>IT Sertifika Sınavları</Text>
          <Text style={styles.headerSubtitle}>
            Sertifika yolculuğunuzu seçin
          </Text>
        </View>
        
        {/* Kategori Filtresi */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={styles.categoryChipIcon}>{categoryIcons[category]}</Text>
              <Text style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <FlatList
          data={filteredExams}
          renderItem={renderExamItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Bu kategoride sınav bulunamadı</Text>
            </View>
          }
        />
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
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  categoryScroll: {
    maxHeight: 50,
    marginBottom: 12,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: '#ffffff',
  },
  categoryChipIcon: {
    fontSize: 16,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  categoryChipTextActive: {
    color: '#667eea',
  },
  listContainer: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  examCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  examCardGradient: {
    padding: 20,
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  examTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  examCategory: {
    fontSize: 13,
    color: '#667eea',
    fontWeight: '600',
    marginBottom: 6,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d1d1f',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  difficultyText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  examDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 14,
  },
  examInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    padding: 12,
    borderRadius: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  startButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontWeight: '500',
  },
});

