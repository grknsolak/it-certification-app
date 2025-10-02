import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Question, ExamResult, Answer } from '../types';
import { certificationExams } from '../data/certificationExams';

type ExamScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exam'>;
type ExamScreenRouteProp = RouteProp<RootStackParamList, 'Exam'>;

interface Props {
  navigation: ExamScreenNavigationProp;
  route: ExamScreenRouteProp;
}

export default function ExamScreen({ navigation, route }: Props) {
  const { examId } = route.params;
  const exam = certificationExams.find(e => e.id === examId);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(exam?.timeLimit ? exam.timeLimit * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!exam) {
      Alert.alert('Hata', 'Sınav bulunamadı');
      navigation.goBack();
      return;
    }
  }, [exam, navigation]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitExam();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (!exam) return;
    const currentQuestion = exam.questions[currentQuestionIndex];
    
    // Çoklu cevap kontrolü
    if (Array.isArray(currentQuestion.correctAnswer)) {
      const currentSelections = (selectedAnswer as number[]) || [];
      if (currentSelections.includes(optionIndex)) {
        setSelectedAnswer(currentSelections.filter(i => i !== optionIndex));
      } else if (currentSelections.length < currentQuestion.correctAnswer.length) {
        setSelectedAnswer([...currentSelections, optionIndex]);
      }
    } else {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && exam) {
      const currentQuestion = exam.questions[currentQuestionIndex];
      
      let isCorrect = false;
      if (Array.isArray(currentQuestion.correctAnswer)) {
        const selectedArray = selectedAnswer as number[];
        isCorrect = selectedArray.length === currentQuestion.correctAnswer.length &&
                   currentQuestion.correctAnswer.every(correct => selectedArray.includes(correct));
      } else {
        isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      }
      
      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        selectedOption: selectedAnswer,
        isCorrect,
        timeSpent: 0,
      };

      setAnswers([...answers, newAnswer]);
      
      if (currentQuestionIndex < exam.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        handleSubmitExam();
      }
    }
  };

  const handleSubmitExam = async () => {
    if (!exam) return;

    let finalAnswers = answers;
    if (selectedAnswer !== null) {
      const currentQuestion = exam.questions[currentQuestionIndex];
      let isCorrect = false;
      
      if (Array.isArray(currentQuestion.correctAnswer)) {
        const selectedArray = selectedAnswer as number[];
        isCorrect = selectedArray.length === currentQuestion.correctAnswer.length &&
                   currentQuestion.correctAnswer.every(correct => selectedArray.includes(correct));
      } else {
        isCorrect = selectedAnswer === currentQuestion.correctAnswer;
      }
      
      finalAnswers = [...answers, {
        questionId: currentQuestion.id,
        selectedOption: selectedAnswer,
        isCorrect,
        timeSpent: 0,
      }];
    }

    const correctAnswers = finalAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / exam.questions.length) * 100);
    const timeSpent = (exam.timeLimit * 60) - timeLeft;

    const result: ExamResult = {
      examId: exam.id,
      score,
      totalQuestions: exam.questions.length,
      correctAnswers,
      wrongAnswers: exam.questions.length - correctAnswers,
      timeSpent,
      completedAt: new Date(),
      answers: finalAnswers,
    };

    try {
      const existingResults = await AsyncStorage.getItem('examResults');
      const results: ExamResult[] = existingResults ? JSON.parse(existingResults) : [];
      results.push(result);
      await AsyncStorage.setItem('examResults', JSON.stringify(results));
    } catch (error) {
      console.error('Sonuç kaydedilemedi:', error);
    }

    setIsSubmitted(true);
    navigation.navigate('Results', { result });
  };

  if (!exam) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  Soru {currentQuestionIndex + 1} / {exam.questions.length}
                </Text>
                <Text style={styles.timerText}>⏱️ {formatTime(timeLeft)}</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionContainer}>
          <View style={styles.questionBadge}>
            <Text style={styles.questionBadgeText}>
              {currentQuestion.difficulty?.toUpperCase() || 'MEDIUM'} • {currentQuestion.category || exam.category}
            </Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
          {Array.isArray(currentQuestion.correctAnswer) && (
            <View style={styles.multiSelectBadge}>
              <Text style={styles.multiSelectText}>
                📋 {currentQuestion.correctAnswer.length} cevap seçin: {((selectedAnswer as number[]) || []).length}/{currentQuestion.correctAnswer.length}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            const isSelected = Array.isArray(currentQuestion.correctAnswer) 
              ? ((selectedAnswer as number[]) || []).includes(index)
              : selectedAnswer === index;
            const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
              
            return (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerSelect(index)}
                activeOpacity={0.7}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.optionGradient}
                  >
                    <View style={styles.optionLetter}>
                      <Text style={styles.optionLetterTextSelected}>{letters[index]}</Text>
                    </View>
                    <Text style={styles.selectedOptionText}>{option}</Text>
                    <Text style={styles.checkmark}>✓</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.optionContent}>
                    <View style={styles.optionLetterUnselected}>
                      <Text style={styles.optionLetterTextUnselected}>{letters[index]}</Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <SafeAreaView edges={['bottom']}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedAnswer === null && styles.disabledButton,
            ]}
            onPress={handleNextQuestion}
            disabled={selectedAnswer === null}
          >
            <LinearGradient
              colors={selectedAnswer === null ? ['#cbd5e1', '#cbd5e1'] : ['#10b981', '#059669']}
              style={styles.nextButtonGradient}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex === exam.questions.length - 1 ? 'Sınavı Bitir →' : 'Sonraki →'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  progressContainer: {
    gap: 12,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 10,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
  timerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  questionContainer: {
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
  questionBadge: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  questionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#667eea',
  },
  questionText: {
    fontSize: 17,
    color: '#1d1d1f',
    lineHeight: 26,
    fontWeight: '500',
  },
  multiSelectBadge: {
    marginTop: 16,
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  multiSelectText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  optionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 16,
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterUnselected: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterTextSelected: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  optionLetterTextUnselected: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6b7280',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
    lineHeight: 22,
  },
  selectedOptionText: {
    flex: 1,
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    lineHeight: 22,
  },
  checkmark: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
  },
  footer: {
    backgroundColor: '#ffffff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

