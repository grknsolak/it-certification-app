import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
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

const { width } = Dimensions.get('window');

export default function ExamScreen({ navigation, route }: Props) {
  const { examId, mode } = route.params;
  const examData = certificationExams.find(e => e.id === examId);
  
  const getQuestions = () => {
    if (!examData) return [];
    
    if (mode === 'exam' && examData.realExamQuestionCount) {
      const targetCount = examData.realExamQuestionCount;
      const availableQuestions = examData.questions;
      const repeatedQuestions: Question[] = [];
      let index = 0;
      
      for (let i = 0; i < targetCount; i++) {
        const question = availableQuestions[index % availableQuestions.length];
        repeatedQuestions.push({
          ...question,
          id: `${question.id}-repeat-${i}`,
        });
        index++;
      }
      
      return repeatedQuestions;
    }
    
    return examData.questions;
  };

  const exam = examData ? { ...examData, questions: getQuestions() } : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeLeft, setTimeLeft] = useState(exam?.timeLimit ? exam.timeLimit * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);

  useEffect(() => {
    if (!exam) {
      Alert.alert('Error', 'Exam not found');
      navigation.goBack();
      return;
    }

    setTimeLeft(exam.timeLimit * 60);
  }, [exam, navigation]);

  useEffect(() => {
    if (mode === 'exam' && timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }

    if (mode === 'exam' && timeLeft === 0 && !isSubmitted) {
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
    
    let newSelectedAnswer: number | number[];
    
    if (Array.isArray(currentQuestion.correctAnswer)) {
      const currentSelections = (selectedAnswer as number[]) || [];
      if (currentSelections.includes(optionIndex)) {
        newSelectedAnswer = currentSelections.filter(i => i !== optionIndex);
      } else if (currentSelections.length < currentQuestion.correctAnswer.length) {
        newSelectedAnswer = [...currentSelections, optionIndex];
      } else {
        return;
      }
    } else {
      newSelectedAnswer = optionIndex;
    }
    
    setSelectedAnswer(newSelectedAnswer);
    
    let isCorrect = false;
    if (Array.isArray(currentQuestion.correctAnswer)) {
      const selectedArray = newSelectedAnswer as number[];
      isCorrect = selectedArray.length === currentQuestion.correctAnswer.length &&
                 currentQuestion.correctAnswer.every(correct => selectedArray.includes(correct));
    } else {
      isCorrect = newSelectedAnswer === currentQuestion.correctAnswer;
    }
    
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: newSelectedAnswer,
      isCorrect,
      timeSpent: 0,
    };

    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    if (existingIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const handleNextQuestion = () => {
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = exam.questions[currentQuestionIndex + 1];
      const nextAnswer = answers.find(a => a.questionId === nextQuestion.id);
      setSelectedAnswer(nextAnswer ? nextAnswer.selectedOption : null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = exam?.questions[currentQuestionIndex - 1];
      if (prevQuestion) {
        const prevAnswer = answers.find(a => a.questionId === prevQuestion.id);
        setSelectedAnswer(prevAnswer ? prevAnswer.selectedOption : null);
      }
    }
  };

  const toggleBookmark = () => {
    if (bookmarkedQuestions.includes(currentQuestionIndex)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter(i => i !== currentQuestionIndex));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, currentQuestionIndex]);
    }
  };

  const handleSubmitExam = async () => {
    if (!exam) return;

    let finalAnswers = [...answers];

    exam.questions.forEach(q => {
      if (!finalAnswers.some(a => a.questionId === q.id)) {
        finalAnswers.push({
          questionId: q.id,
          selectedOption: -1,
          isCorrect: false,
          timeSpent: 0,
        });
      }
    });

    const correctAnswers = finalAnswers.filter(answer => answer.isCorrect).length;
    const score = Math.round((correctAnswers / exam.questions.length) * 100);
    const timeSpent = mode === 'exam' ? (exam.timeLimit * 60) - timeLeft : 0;

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
      console.error('Error saving result:', error);
    }

    setIsSubmitted(true);
    navigation.navigate('Results', { result });
  };

  const handleFinishEarly = () => {
    Alert.alert(
      'Submit Exam',
      'Are you sure you want to submit the exam now?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Submit', onPress: () => handleSubmitExam(), style: 'destructive' }
      ]
    );
  };

  if (!exam) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  const isBookmarked = bookmarkedQuestions.includes(currentQuestionIndex);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Modern Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => {
              Alert.alert(
                'Exit Exam',
                'Your progress will be lost. Are you sure?',
                [
                  { text: 'Stay', style: 'cancel' },
                  { text: 'Exit', onPress: () => navigation.goBack(), style: 'destructive' }
                ]
              );
            }}
          >
            <Text style={styles.exitButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.examTitle}>{exam.title}</Text>
            <Text style={styles.questionCounter}>
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.bookmarkButton, isBookmarked && styles.bookmarkButtonActive]}
            onPress={toggleBookmark}
          >
            <Text style={styles.bookmarkIcon}>{isBookmarked ? '⭐' : '☆'}</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Timer (for exam mode) */}
        {mode === 'exam' && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>⏱️</Text>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        )}

        {/* Question Content */}
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            
            {Array.isArray(currentQuestion.correctAnswer) && (
              <View style={styles.multiSelectBadge}>
                <Text style={styles.multiSelectText}>
                  Select {currentQuestion.correctAnswer.length} answers
                </Text>
              </View>
            )}
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = Array.isArray(currentQuestion.correctAnswer)
                ? ((selectedAnswer as number[]) || []).includes(index)
                : selectedAnswer === index;
              const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.optionLetter,
                    isSelected && styles.optionLetterSelected
                  ]}>
                    <Text style={[
                      styles.optionLetterText,
                      isSelected && styles.optionLetterTextSelected
                    ]}>
                      {letters[index]}
                    </Text>
                  </View>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected
                  ]}>
                    {option}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkCircle}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Navigation Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.previousButton,
              currentQuestionIndex === 0 && styles.navButtonDisabled
            ]}
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </TouchableOpacity>

          {currentQuestionIndex === exam.questions.length - 1 ? (
            <TouchableOpacity
              style={[styles.navButton, styles.submitButton]}
              onPress={handleFinishEarly}
            >
              <Text style={[styles.navButtonText, styles.submitButtonText]}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNextQuestion}
            >
              <Text style={[styles.navButtonText, styles.nextButtonText]}>Next →</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  exitButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButtonText: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  questionCounter: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: '500',
  },
  bookmarkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkButtonActive: {
    backgroundColor: '#fef3c7',
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e5e7eb',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  timerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ef4444',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#1f2937',
    fontWeight: '500',
  },
  multiSelectBadge: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  multiSelectText: {
    fontSize: 13,
    color: '#1e40af',
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  optionButtonSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  optionLetter: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterSelected: {
    backgroundColor: '#3b82f6',
  },
  optionLetterText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6b7280',
  },
  optionLetterTextSelected: {
    color: '#ffffff',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
  },
  optionTextSelected: {
    color: '#1e40af',
    fontWeight: '500',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkmark: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previousButton: {
    backgroundColor: '#f3f4f6',
  },
  nextButton: {
    backgroundColor: '#3b82f6',
  },
  submitButton: {
    backgroundColor: '#10b981',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  nextButtonText: {
    color: '#ffffff',
  },
  submitButtonText: {
    color: '#ffffff',
  },
});
