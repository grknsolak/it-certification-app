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
  const { examId, mode } = route.params;
  const examData = certificationExams.find(e => e.id === examId);
  
  // Mode'a göre soruları ayarla
  const getQuestions = () => {
    if (!examData) return [];
    
    if (mode === 'exam' && examData.realExamQuestionCount) {
      const targetCount = examData.realExamQuestionCount;
      const availableQuestions = examData.questions;
      
      // Gerçek soru sayısına ulaşmak için soruları tekrarla
      const repeatedQuestions: Question[] = [];
      let index = 0;
      
      for (let i = 0; i < targetCount; i++) {
        const question = availableQuestions[index % availableQuestions.length];
        // Her tekrarda unique ID oluştur
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
  
  const questions = getQuestions();
  const exam = examData ? { ...examData, questions } : null;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  // Practice mode'da timer yok
  const [timeLeft, setTimeLeft] = useState(mode === 'exam' && exam?.timeLimit ? exam.timeLimit * 60 : 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([]);
  const [showQuestionGrid, setShowQuestionGrid] = useState(true); // İlk girişte göster!
  const [hasStarted, setHasStarted] = useState(false); // Kullanıcı başladı mı?
  const [questionFilter, setQuestionFilter] = useState<'all' | 'answered' | 'bookmarked' | 'unanswered'>('all');

  useEffect(() => {
    if (!exam) {
      Alert.alert('Hata', 'Sınav bulunamadı');
      navigation.goBack();
      return;
    }
  }, [exam, navigation]);

  useEffect(() => {
    // Sadece exam mode'da VE başladıktan sonra timer çalışsın
    if (mode === 'exam' && hasStarted && timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (mode === 'exam' && hasStarted && timeLeft === 0 && !isSubmitted) {
      handleSubmitExam();
    }
  }, [timeLeft, isSubmitted, mode, hasStarted]);

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

  const toggleBookmark = () => {
    if (bookmarkedQuestions.includes(currentQuestionIndex)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter(i => i !== currentQuestionIndex));
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, currentQuestionIndex]);
    }
  };

  const goToQuestion = (index: number) => {
    // Mevcut sorunun cevabını kaydet
    if (selectedAnswer !== null && exam) {
      saveCurrentAnswer();
    }
    setCurrentQuestionIndex(index);
    setSelectedAnswer(null);
    setShowQuestionGrid(false);
    
    // İlk kez soru seçildiğinde başla
    if (!hasStarted) {
      setHasStarted(true);
    }
  };

  const saveCurrentAnswer = () => {
    if (!exam || selectedAnswer === null) return;
    
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

    // Eğer bu soru için zaten cevap varsa güncelle
    const existingIndex = answers.findIndex(a => a.questionId === currentQuestion.id);
    if (existingIndex !== -1) {
      const newAnswers = [...answers];
      newAnswers[existingIndex] = newAnswer;
      setAnswers(newAnswers);
    } else {
      setAnswers([...answers, newAnswer]);
    }
  };

  const handlePreviousQuestion = () => {
    if (selectedAnswer !== null && exam) {
      saveCurrentAnswer();
    }
    
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null && exam) {
      saveCurrentAnswer();
    }
    
    if (exam && currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSkipAndFinish = () => {
    if (selectedAnswer !== null && exam) {
      saveCurrentAnswer();
    }
    handleSubmitExam();
  };

  const handleFinishEarly = () => {
    Alert.alert(
      'Sınavı Bitir',
      `${exam?.questions.length} sorudan ${answers.length} tanesini cevapladınız. Sınavı bitirmek istediğinize emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel'
        },
        {
          text: 'Bitir',
          style: 'destructive',
          onPress: () => handleSubmitExam()
        }
      ]
    );
  };

  const handleSubmitExam = async () => {
    if (!exam) return;

    let finalAnswers = [...answers];
    
    // Mevcut sorunun cevabını ekle (eğer varsa ve henüz eklenmemişse)
    if (selectedAnswer !== null) {
      const currentQuestion = exam.questions[currentQuestionIndex];
      const alreadyAnswered = finalAnswers.some(a => a.questionId === currentQuestion.id);
      
      if (!alreadyAnswered) {
        let isCorrect = false;
        
        if (Array.isArray(currentQuestion.correctAnswer)) {
          const selectedArray = selectedAnswer as number[];
          isCorrect = selectedArray.length === currentQuestion.correctAnswer.length &&
                     currentQuestion.correctAnswer.every(correct => selectedArray.includes(correct));
        } else {
          isCorrect = selectedAnswer === currentQuestion.correctAnswer;
        }
        
        finalAnswers.push({
          questionId: currentQuestion.id,
          selectedOption: selectedAnswer,
          isCorrect,
          timeSpent: 0,
        });
      }
    }

    // Cevaplanmayan soruları boş cevap olarak ekle
    exam.questions.forEach(q => {
      if (!finalAnswers.some(a => a.questionId === q.id)) {
        finalAnswers.push({
          questionId: q.id,
          selectedOption: -1, // -1 = cevaplanmadı
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
                <View>
                  <Text style={styles.progressText}>
                    Soru {currentQuestionIndex + 1} / {exam.questions.length}
                  </Text>
                  <Text style={styles.modeText}>
                    {mode === 'exam' ? '🎯 Sınav Modu' : '💡 Alıştırma Modu'}
                    {bookmarkedQuestions.length > 0 && ` • ⭐ ${bookmarkedQuestions.length}`}
                  </Text>
                </View>
                {mode === 'exam' && (
                  <Text style={styles.timerText}>⏱️ {formatTime(timeLeft)}</Text>
                )}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Question Grid Modal */}
      {showQuestionGrid && (
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalSafeArea}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Tüm Sorular</Text>
                <TouchableOpacity onPress={() => setShowQuestionGrid(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalLegend}>
                <TouchableOpacity 
                  style={styles.legendItem}
                  onPress={() => setQuestionFilter('all')}
                >
                  <View style={[
                    styles.legendBox, 
                    { backgroundColor: '#667eea' },
                    questionFilter === 'all' && styles.legendBoxActive
                  ]} />
                  <Text style={[
                    styles.legendText,
                    questionFilter === 'all' && styles.legendTextActive
                  ]}>Tümü</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.legendItem}
                  onPress={() => setQuestionFilter('answered')}
                >
                  <View style={[
                    styles.legendBox, 
                    { backgroundColor: '#10b981' },
                    questionFilter === 'answered' && styles.legendBoxActive
                  ]} />
                  <Text style={[
                    styles.legendText,
                    questionFilter === 'answered' && styles.legendTextActive
                  ]}>Cevaplandı</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.legendItem}
                  onPress={() => setQuestionFilter('bookmarked')}
                >
                  <View style={[
                    styles.legendBox, 
                    { backgroundColor: '#f59e0b' },
                    questionFilter === 'bookmarked' && styles.legendBoxActive
                  ]} />
                  <Text style={[
                    styles.legendText,
                    questionFilter === 'bookmarked' && styles.legendTextActive
                  ]}>⭐ İşaretli</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.legendItem}
                  onPress={() => setQuestionFilter('unanswered')}
                >
                  <View style={[
                    styles.legendBox, 
                    { backgroundColor: '#e5e7eb' },
                    questionFilter === 'unanswered' && styles.legendBoxActive
                  ]} />
                  <Text style={[
                    styles.legendText,
                    questionFilter === 'unanswered' && styles.legendTextActive
                  ]}>Cevaplanmadı</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.questionGrid} contentContainerStyle={styles.questionGridContent}>
                {exam.questions.map((_, index) => {
                  const isAnswered = answers.some(a => a.questionId === exam.questions[index].id);
                  const isBookmarked = bookmarkedQuestions.includes(index);
                  const isCurrent = index === currentQuestionIndex;
                  
                  // Filter logic
                  let shouldShow = true;
                  if (questionFilter === 'answered' && !isAnswered) shouldShow = false;
                  if (questionFilter === 'bookmarked' && !isBookmarked) shouldShow = false;
                  if (questionFilter === 'unanswered' && isAnswered) shouldShow = false;
                  
                  if (!shouldShow) return null;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.questionGridItem,
                        isAnswered && styles.questionGridItemAnswered,
                        isBookmarked && styles.questionGridItemBookmarked,
                        isCurrent && styles.questionGridItemCurrent,
                      ]}
                      onPress={() => goToQuestion(index)}
                    >
                      <Text style={[
                        styles.questionGridItemText,
                        (isAnswered || isBookmarked || isCurrent) && styles.questionGridItemTextActive
                      ]}>
                        {index + 1}
                      </Text>
                      {isBookmarked && <Text style={styles.questionGridStar}>⭐</Text>}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      )}

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
        <SafeAreaView>
          <View style={styles.footerButtons}>
            {/* Önceki Butonu */}
            {currentQuestionIndex > 0 && (
              <TouchableOpacity
                style={styles.footerButton}
                onPress={handlePreviousQuestion}
              >
                <Text style={styles.footerButtonText}>← Önceki</Text>
              </TouchableOpacity>
            )}

            {/* Sorular Butonu */}
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => setShowQuestionGrid(true)}
            >
              <Text style={styles.footerButtonText}>📋 Sorular</Text>
            </TouchableOpacity>

            {/* İşaretle Butonu */}
            <TouchableOpacity
              style={[
                styles.footerButton,
                bookmarkedQuestions.includes(currentQuestionIndex) && styles.footerButtonBookmarked
              ]}
              onPress={toggleBookmark}
            >
              <Text style={styles.footerButtonText}>
                {bookmarkedQuestions.includes(currentQuestionIndex) ? '⭐ İşaretli' : '☆ İşaretle'}
              </Text>
            </TouchableOpacity>

            {/* Bitir Butonu */}
            <TouchableOpacity
              style={[styles.footerButton, styles.footerButtonFinish]}
              onPress={handleFinishEarly}
            >
              <Text style={styles.footerButtonText}>🏁 Bitir</Text>
            </TouchableOpacity>

            {/* Sonraki / Bitir Son Soru Butonu */}
            {currentQuestionIndex < exam.questions.length - 1 ? (
              <TouchableOpacity
                style={[styles.footerButton, styles.footerButtonNext]}
                onPress={handleNextQuestion}
              >
                <Text style={styles.footerButtonText}>Sonraki →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.footerButton, styles.footerButtonFinish]}
                onPress={handleSkipAndFinish}
              >
                <Text style={styles.footerButtonText}>✓ Tamamla</Text>
              </TouchableOpacity>
            )}
          </View>
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
  modeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginTop: 4,
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
  footerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  footerButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  footerButtonBookmarked: {
    backgroundColor: '#fef3c7',
  },
  footerButtonFinish: {
    backgroundColor: '#fee2e2',
  },
  footerButtonNext: {
    backgroundColor: '#d1fae5',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSafeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  modalClose: {
    fontSize: 28,
    color: '#6b7280',
    fontWeight: '300',
  },
  modalLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendBoxActive: {
    borderWidth: 3,
    borderColor: '#1f2937',
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  legendTextActive: {
    color: '#1f2937',
    fontWeight: '700',
  },
  questionGrid: {
    flex: 1,
  },
  questionGridContent: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  questionGridItem: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  questionGridItemAnswered: {
    backgroundColor: '#10b981',
  },
  questionGridItemBookmarked: {
    backgroundColor: '#f59e0b',
  },
  questionGridItemCurrent: {
    backgroundColor: '#667eea',
    borderWidth: 3,
    borderColor: '#764ba2',
  },
  questionGridItemText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6b7280',
  },
  questionGridItemTextActive: {
    color: '#ffffff',
  },
  questionGridStar: {
    position: 'absolute',
    top: -4,
    right: -4,
    fontSize: 16,
  },
});

