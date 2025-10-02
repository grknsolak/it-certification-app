# IT Exam Certification - Mobil Sınav Uygulaması 🎓

IT sertifika sınavlarına hazırlık için geliştirilmiş modern, kullanıcı dostu mobil uygulama.

## 🚀 Özellikler

### 📱 Platform & Temel Özellikler
- ✅ **Çoklu Platform Desteği**: iOS, Android ve Huawei cihazlarda çalışır
- 📚 **Geniş Sınav Koleksiyonu**: AWS, Google Cloud, Kubernetes, CompTIA Security+, Terraform ve daha fazlası
- ⏱️ **Zamanlayıcı**: Gerçek sınav deneyimi için dakika sayacı
- 📊 **İstatistik Takibi**: İlerlemenizi ve performansınızı izleyin
- 🎯 **Detaylı Sonuçlar**: Doğru/yanlış cevapları ve açıklamaları görün
- 💾 **Otomatik Kayıt**: Sınav geçmişiniz otomatik olarak kaydedilir
- 🌍 **Türkçe Arayüz**: Tam Türkçe dil desteği

### 🎨 Profesyonel UI/UX Design System
- **🌓 Dark Mode**: Light/Dark/System tema desteği (otomatik kaydetme)
- **📐 Design Tokens**: 4/8/12/16/24/32 spacing scale
- **📝 Typography**: Hiyerarşik yazı tipleri (H1-H4, body, caption) - satır aralığı ≥1.4
- **🎨 Semantic Colors**: Primary, success, warning, error renk sistemi
- **✨ Gradient Tasarım**: Modern gradient arka planlar
- **🔲 Border Radius**: 12-16dp yumuşak köşeler
- **💫 Shadows**: Yumuşak gölgeler (sm/md/lg)
- **📱 Touch Targets**: Minimum 44x44dp dokunma alanı (iOS/Android standartları)

### ♿ Erişilebilirlik (A11y) - WCAG 2.1 AA
- **🔍 Kontrast**: ≥4.5:1 renk kontrast oranı
- **🗣️ Screen Reader**: VoiceOver/TalkBack desteği
- **⌨️ Klavye**: Tam klavye navigasyonu
- **🎯 Focus**: Görünür focus göstergeleri
- **📏 Dynamic Type**: Font ölçeklendirme desteği

### ⚡ Performance & UX
- **⏳ Loading Skeletons**: Animasyonlu yükleme iskeletleri
- **📭 Empty States**: İllüstrasyonlu boş durumlar
- **🔄 Error Boundaries**: Zarif hata yönetimi
- **📳 Haptic Feedback**: Dokunsal geri bildirim
- **🎭 Smooth Animations**: Pürüzsüz geçişler (150/300/500ms)
- **💾 Offline Cache**: Çevrimdışı veri saklama

## 📱 Mevcut Sertifikalar

### Cloud Computing ☁️
- AWS Certified Cloud Practitioner
- AWS Solutions Architect Associate
- Google Cloud Associate Engineer

### Cybersecurity 🛡️
- CompTIA Security+ SY0-701

### Container Orchestration 🐳
- Certified Kubernetes Administrator (CKA)

### DevOps ⚙️
- HashiCorp Terraform Associate

## 🛠️ Teknolojiler

- **React Native** - Cross-platform mobil framework
- **Expo** - Hızlı geliştirme ve dağıtım
- **TypeScript** - Tip güvenliği
- **React Navigation** - Navigasyon yönetimi
- **AsyncStorage** - Yerel veri saklama
- **Expo Linear Gradient** - Modern gradient tasarım

## 📦 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- iOS Simulator veya Android Emulator (opsiyonel)

### Adımlar

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/grknsolak/it-certification-app.git
   cd it-certification-app
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Uygulamayı başlatın:**
   ```bash
   npm start
   ```

4. **Platformlar:**
   - **iOS**: `npm run ios`
   - **Android**: `npm run android`
   - **Web**: `npm run web`

## 📱 Kullanım

1. **Giriş**: Uygulamayı açın ve "Misafir Olarak Devam Et" veya giriş yapın
2. **Sınav Seçimi**: Ana ekrandan "Sınava Başla" butonuna tıklayın
3. **Kategori Filtresi**: İstediğiniz kategoriyi seçin (Cloud, Security, vb.)
4. **Sınava Başlama**: Sınav kartından "Sınava Başla" butonuna tıklayın
5. **Soruları Cevaplayın**: Her soru için doğru cevabı seçin
6. **Sonuçları İnceleyin**: Sınav bitiminde detaylı sonuçları görün
7. **İlerleme Takibi**: Ana sayfada istatistiklerinizi kontrol edin

## 🎯 Özellik Detayları

### Çoklu Cevap Desteği
- Bazı sorular "Choose two" formatında çoklu cevap gerektirir
- Uygulama otomatik olarak bu soruları algılar ve işaretler

### Zaman Yönetimi
- Her sınav için gerçekçi süre limitleri
- Geri sayım zamanlayıcısı
- Süre dolduğunda otomatik gönderim

### Detaylı Geri Bildirim
- Her soru için açıklamalar
- Doğru/yanlış cevap görselleştirme
- Genel performans metrikleri

## 📂 Proje Yapısı

```
it-certification-app/
├── src/
│   ├── design-system/
│   │   └── tokens.ts                # Design tokens (spacing, colors, typography)
│   ├── contexts/
│   │   └── ThemeContext.tsx         # Theme provider (light/dark/system)
│   ├── components/
│   │   ├── Button.tsx               # Accessible button component
│   │   ├── LoadingSkeleton.tsx      # Animated loading skeletons
│   │   ├── EmptyState.tsx           # Empty state component
│   │   └── ErrorBoundary.tsx        # Error boundary wrapper
│   ├── data/
│   │   └── certificationExams.ts    # Sınav verileri
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Giriş ekranı
│   │   ├── HomeScreen.tsx           # Ana sayfa
│   │   ├── ExamListScreen.tsx       # Sınav listesi
│   │   ├── ExamScreen.tsx           # Sınav ekranı
│   │   ├── ResultsScreen.tsx        # Sonuç ekranı
│   │   ├── SettingsScreen.tsx       # Ayarlar
│   │   └── QuestionReviewScreen.tsx # Soru inceleme
│   ├── types/
│   │   └── index.ts                 # TypeScript tipleri
│   ├── hooks/                       # Custom hooks
│   └── assets/
│       └── illustrations/           # Empty state illustrations
├── App.tsx                          # Ana uygulama + providers
├── package.json
└── README.md
```

## 🎨 Design System Kullanımı

### Theme Kullanımı

```typescript
import { useTheme } from './src/contexts/ThemeContext';

function MyComponent() {
  const { colors, activeTheme, setTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.textPrimary }}>Hello World</Text>
      <Button title="Dark Mode" onPress={() => setTheme('dark')} />
    </View>
  );
}
```

### Design Tokens

```typescript
import { spacing, typography, radius, shadows } from './src/design-system/tokens';

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,        // 16px
    borderRadius: radius.md,    // 12px
    ...shadows.md,              // Medium shadow
  },
  title: {
    ...typography.h2,           // fontSize: 24, lineHeight: 32, fontWeight: '700'
  },
});
```

### Component Library

```typescript
import Button from './src/components/Button';
import EmptyState from './src/components/EmptyState';
import { LoadingSkeleton, ExamListSkeleton } from './src/components/LoadingSkeleton';

// Button variants
<Button title="Primary" onPress={handlePress} variant="primary" />
<Button title="Outline" onPress={handlePress} variant="outline" />
<Button title="Ghost" onPress={handlePress} variant="ghost" />
<Button title="Loading" loading={true} />

// Empty State
<EmptyState
  icon="📭"
  title="No Exams"
  description="Start by selecting an exam"
  actionLabel="Browse Exams"
  onAction={() => navigate('ExamList')}
/>

// Loading Skeletons
{loading ? <ExamListSkeleton /> : <ExamList />}
```

## 🔧 Geliştirme

### Yeni Sınav Ekleme

`src/data/certificationExams.ts` dosyasına yeni sınav objesi ekleyin:

```typescript
{
  id: 'unique-exam-id',
  title: 'Sınav Başlığı',
  description: 'Sınav açıklaması',
  timeLimit: 90, // dakika
  passingScore: 70, // yüzde
  category: 'Cloud Computing',
  icon: '☁️',
  createdAt: new Date(),
  questions: [
    // Sorular buraya
  ]
}
```

### Yeni Soru Ekleme

```typescript
{
  id: 'question-id',
  question: 'Soru metni?',
  options: [
    'Seçenek A',
    'Seçenek B',
    'Seçenek C',
    'Seçenek D'
  ],
  correctAnswer: 0, // veya [0, 2] çoklu cevap için
  explanation: 'Cevap açıklaması',
  category: 'Kategori',
  difficulty: 'easy' // easy, medium, hard
}
```

## 🚀 Production Build

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

### Huawei (AppGallery)

Expo'nun AppGallery desteğini kullanarak veya APK'yı doğrudan yükleyerek dağıtabilirsiniz.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Gürkan Solak**
- GitHub: [@grknsolak](https://github.com/grknsolak)

## 🙏 Teşekkürler

Bu projeyi kullandığınız için teşekkür ederiz! Herhangi bir sorun veya öneriniz varsa lütfen issue açın.

---

**Not**: Bu uygulama eğitim amaçlıdır ve gerçek sertifika sınavlarının yerini tutmaz. Resmi sınavlara hazırlık için ek kaynaklarla desteklenmelidir.

