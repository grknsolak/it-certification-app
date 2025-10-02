import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { certificationExams } from '../data/certificationExams';

type QuestionReviewScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QuestionReview'>;
type QuestionReviewScreenRouteProp = RouteProp<RootStackParamList, 'QuestionReview'>;

interface Props {
  navigation: QuestionReviewScreenNavigationProp;
  route: QuestionReviewScreenRouteProp;
}

export default function QuestionReviewScreen({ navigation, route }: Props) {
  const { examId } = route.params;
  const exam = certificationExams.find(e => e.id === examId);

  if (!exam) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Sınav bulunamadı</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{exam.title}</Text>
        <Text style={styles.subtitle}>Soru İnceleme</Text>

        {exam.questions.map((question, index) => (
          <View key={question.id} style={styles.questionCard}>
            <Text style={styles.questionNumber}>Soru {index + 1}</Text>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, optIndex) => {
                const isCorrect = Array.isArray(question.correctAnswer) 
                  ? question.correctAnswer.includes(optIndex)
                  : question.correctAnswer === optIndex;
                
                return (
                  <View
                    key={optIndex}
                    style={[styles.option, isCorrect && styles.correctOption]}
                  >
                    <Text style={[styles.optionText, isCorrect && styles.correctOptionText]}>
                      {String.fromCharCode(65 + optIndex)}. {option}
                      {isCorrect && ' ✓'}
                    </Text>
                  </View>
                );
              })}
            </View>

            {question.explanation && (
              <View style={styles.explanationCard}>
                <Text style={styles.explanationTitle}>💡 Açıklama:</Text>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1d1d1f',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#667eea',
    marginBottom: 12,
  },
  questionText: {
    fontSize: 16,
    color: '#1d1d1f',
    lineHeight: 24,
    marginBottom: 16,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  option: {
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  correctOption: {
    backgroundColor: '#dcfce7',
    borderColor: '#10b981',
  },
  optionText: {
    fontSize: 14,
    color: '#1f2937',
  },
  correctOptionText: {
    color: '#059669',
    fontWeight: '600',
  },
  explanationCard: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d1d1f',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});

