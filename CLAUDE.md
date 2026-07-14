# ゆっくり塾 学習アプリ窓口サイト 仕様書

## 1. プロジェクト概要

ゆっくり塾（個別指導・少人数）が制作した学習アプリ群を、塾外の利用者・塾生の双方に提供する窓口サイト。塾ブログから誘導し、各アプリへのアクセスを一元化する。

### 1.0 リブランドについて（2026年7月〜）

- サイト名を「上松ゆっくり塾」から「ゆっくり塾」に変更し、既存の「上松ゆっくり塾」（別の塾）とはブランドを切り離す
- 塾紹介・誘導元をアメブロから note へ移行済み。noteアカウント：**https://note.com/yukkuri_jyuku**（`site.blogUrl` を差し替え済み）
- カンパ（応援金）の支払い方法を銀行振込・PayPayから Stripe（クレジットカード決済）および note内の決済（一部商品）に変更済み
- Stripeの審査要件として、特定商取引法に基づく表記ページ（`/tokushoho`）を新設・公開済み（詳細は4.3節）

### 1.1 塾の世界観

- **塾名の由来**：「ゆっくり」は、急がせない・理解を飛ばさない・生徒のペースを大切にすることを意味する
- **アプリのコンセプト**：「ゆっくり × 最先端」のギャップ。生徒のペースに寄り添うために、AIなど最新技術を活用する
- **デザイン方針**：和の落ち着いた雰囲気をベースに、さりげない現代的要素を組み合わせる

### 1.2 目的

- 複数の学習アプリを一覧表示し、利用者が目的のアプリにアクセスできるようにする
- 塾生は専用ページから全アプリのパスワードを取得できる
- 一般利用者にはカンパ（応援金）制でアプリパスワードを配布する旨を案内する
- 塾ブログ（note）（塾紹介）への導線を設置する

### 1.3 利用者層

- **塾生**：長野高校志望の高校生中心。塾生用ページから全アプリ無料利用。
- **塾生の保護者**：塾の取り組みを知る目的で訪問。
- **一般のブログ読者**：塾ブログ（note）から流入、興味があればカンパで利用。

### 1.4 全体の導線設計

```
塾ブログ（note）（塾紹介・記事）
   ↓ リンク
窓口サイト（このプロジェクト）
   ↓                    ↓
塾生用ページ        各アプリ（別Vercelプロジェクト）
（共通パスワード）   （カンパ制 or 無料）
```

## 2. 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| ホスティング | Vercel（Hobbyプラン） |
| 認証 | middleware.ts によるBasic認証 |
| データ管理 | apps.json（静的JSONファイル） |
| デプロイ | GitHub連携で自動デプロイ |

### 2.1 Next.js を採用する理由

- middleware.tsで`/students/`配下のBasic認証を実装可能
- 静的書き出し（SSG）で高速配信
- Vercelとの相性が最良
- 将来的な機能追加（API Routes等）が容易

## 3. ファイル構成

```
portal-site/
├── app/
│   ├── layout.tsx              # 全ページ共通レイアウト
│   ├── page.tsx                # トップページ（アプリ一覧）
│   ├── students/
│   │   └── page.tsx            # 塾生用ページ（要認証）
│   └── globals.css
├── components/
│   ├── AppCard.tsx             # アプリカード
│   ├── SubjectSection.tsx      # 科目別セクション
│   ├── KampaInfo.tsx           # カンパ案内（折りたたみ）
│   ├── HeroSection.tsx         # ヒーローセクション
│   └── Footer.tsx              # フッター
├── lib/
│   └── apps.ts                 # apps.jsonの読み込みと型定義
├── data/
│   └── apps.json               # アプリ一覧データ
├── public/
│   └── icons/                  # アイコン画像（使う場合）
├── middleware.ts               # /students/* のBasic認証
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 4. ページ構成

### 4.1 トップページ（`/`）

公開ページ。以下のセクションを縦に並べる。

```
┌─────────────────────────────────────┐
│  ヘッダー                              │
│  - サイト名（ゆっくり塾）               │
│  - 塾ブログへのリンク（note）           │
├─────────────────────────────────────┤
│  ヒーローセクション                     │
│  - キャッチコピー                       │
│    「ゆっくり塾の、                     │
│     ありそうでなかった学習アプリ」       │
│  - 説明文                              │
│    「現場の指導から生まれた学習アプリ群。│
│     AIを使いながら、                    │
│     生徒のペースに寄り添います。」       │
├─────────────────────────────────────┤
│  カンパ・パスワード案内（折りたたみ）    │
│  - 半年2,000円／年3,500円              │
│  - 支払い方法                          │
│  - パスワード発行の流れ                 │
│  - 塾生は全アプリ無料の旨              │
├─────────────────────────────────────┤
│  アプリ一覧                           │
│  ├ 英語アプリ                         │
│  │  └ カード × N                      │
│  ├ 古文アプリ                         │
│  │  └ カード × N                      │
│  ├ 数学アプリ（追加されたら）           │
│  └ 化学アプリ（追加されたら）           │
├─────────────────────────────────────┤
│  塾紹介セクション                      │
│  - 塾の簡単な説明                     │
│  - 塾ブログへのリンク（note、メインサイト） │
│  - 連絡先・体験授業案内                │
├─────────────────────────────────────┤
│  フッター                              │
│  - 特定商取引法に基づく表記へのリンク    │
└─────────────────────────────────────┘
```

### 4.2 塾生用ページ（`/students/`）

Basic認証必須。以下を表示。

- 塾生向けの挨拶
- 各アプリのカンパ用パスワード一覧（カンパ制の各アプリで使うパスワード）
- パスワードの有効期限（例：「2026年9月末まで有効」）
- 塾外への共有禁止の注意書き

塾生はこのページのパスワードを1つ覚えれば、全アプリにアクセスできる。

### 4.3 特定商取引法に基づく表記ページ（`/tokushoho`）

Stripe決済導入の審査要件として設置した公開ページ（`app/tokushoho/page.tsx`）。

- 販売事業者名・運営統括責任者・所在地・連絡先・支払い方法・返品条件などを表 形式で表示
- 内容は `特定商取引法に基づく表記.md`（リポジトリ直下、Git管理外）を元に実装
- フッターから常時リンク（Stripe審査で実際に公開・閲覧できる状態が求められるため）
- 認証不要・検索エンジンにも公開（`noindex` にしない）

## 5. データ仕様（apps.json）

### 5.1 全体構造

```json
{
  "version": "1.0",
  "lastUpdated": "2026-04-30",
  "site": {
    "name": "ゆっくり塾",
    "tagline": "ゆっくり塾の、ありそうでなかった学習アプリ",
    "description": "現場の指導から生まれた学習アプリ群。AIを使いながら、生徒のペースに寄り添います。",
    "blogUrl": "https://note.com/yukkuri_jyuku",
    "kampaInfo": {
      "halfYear": 2000,
      "year": 3500,
      "currency": "JPY",
      "paymentMethods": ["クレジットカード決済（Stripe）", "note内の決済（一部商品）"],
      "studentsFree": true,
      "passwordRotationMonths": 6
    }
  },
  "subjectOrder": ["english", "kobun", "math", "chemistry"],
  "apps": [
    /* AppData の配列 */
  ]
}
```

### 5.2 AppData の型定義

```typescript
type AppData = {
  id: string;                    // 一意ID（英数字とハイフン）
  name: string;                  // 表示名
  subject: Subject;              // 科目分類
  category: string;              // 科目内のカテゴリ
  description: string;           // カード表示用説明（2-3行）
  shortDescription?: string;     // 超短縮版（任意）
  url: string;                   // アプリのURL
  status: AppStatus;             // 開発状況
  access: AccessType;            // アクセス権限
  icon: string;                  // 絵文字 or 画像パス
  tags: string[];                // 検索・フィルタ用
  targetLevel: string[];         // 対象学年
  techStack?: string[];          // 管理用メモ（非表示でも可）
  lastUpdated: string;           // YYYY-MM-DD形式
};

type Subject = "english" | "kobun" | "math" | "chemistry" | "biology" | "physics";

type AppStatus = 
  | "production"   // 完成・本番運用
  | "beta"         // ベータ版（使えるが完成度80%程度）
  | "alpha"        // 試験運用（50%程度）
  | "development"  // 開発中（リンク無効）
  | "planned";     // 構想段階（リンク無効）

type AccessType = 
  | "free"            // 完全無料
  | "kampa"           // カンパ制パスワード
  | "students_only"   // 塾生限定
  | "auth_required";  // 要認証（汎用）
```

### 5.3 apps.json サンプル（既存アプリ反映版）

```json
{
  "version": "1.0",
  "lastUpdated": "2026-04-30",
  "site": {
    "name": "ゆっくり塾",
    "tagline": "ゆっくり塾の、ありそうでなかった学習アプリ",
    "description": "現場の指導から生まれた学習アプリ群。AIを使いながら、生徒のペースに寄り添います。",
    "blogUrl": "https://note.com/yukkuri_jyuku",
    "kampaInfo": {
      "halfYear": 2000,
      "year": 3500,
      "currency": "JPY",
      "paymentMethods": ["クレジットカード決済（Stripe）", "note内の決済（一部商品）"],
      "studentsFree": true,
      "passwordRotationMonths": 6
    }
  },
  "subjectOrder": ["english", "kobun", "math", "chemistry"],
  "apps": [
    {
      "id": "english-grammar",
      "name": "英文法問題集",
      "subject": "english",
      "category": "grammar",
      "description": "1000問以上からランダム出題。直近の出題は重複回避。",
      "url": "[アプリURL未確定]",
      "status": "production",
      "access": "free",
      "icon": "📝",
      "tags": ["英語", "文法", "ランダム出題"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["静的HTML"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "english-writing",
      "name": "英作文添削",
      "subject": "english",
      "category": "writing",
      "description": "AIが英作文を添削。和文英訳と自由英作文に対応。",
      "url": "[アプリURL未確定]",
      "status": "beta",
      "access": "kampa",
      "icon": "✍️",
      "tags": ["英語", "ライティング", "AI", "添削"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["Next.js", "Gemini API"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "english-speaking",
      "name": "英会話練習",
      "subject": "english",
      "category": "speaking",
      "description": "AIと音声で英会話。会話後にまとめてフィードバック。",
      "url": "[アプリURL未確定]",
      "status": "alpha",
      "access": "kampa",
      "icon": "🗣️",
      "tags": ["英語", "スピーキング", "AI", "音声"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["Next.js", "Gemini API", "Google TTS"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "english-listening",
      "name": "英語リスニング",
      "subject": "english",
      "category": "listening",
      "description": "共テ・英検・TEAP対策。AIが問題を生成、レベル別に練習可能。",
      "url": "[アプリURL未確定]",
      "status": "alpha",
      "access": "kampa",
      "icon": "🎧",
      "tags": ["英語", "リスニング", "AI", "共テ", "英検", "TEAP"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["Next.js", "Gemini API", "Google TTS"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "english-reading",
      "name": "英語リーディング",
      "subject": "english",
      "category": "reading",
      "description": "AIがレベル別に英文と問題を生成。多読練習向け。",
      "url": "",
      "status": "development",
      "access": "kampa",
      "icon": "📖",
      "tags": ["英語", "リーディング", "AI"],
      "targetLevel": ["高2", "高3"],
      "techStack": ["Next.js", "Gemini API"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "english-vocabulary",
      "name": "英単語記憶ツール",
      "subject": "english",
      "category": "vocabulary",
      "description": "Anki的な反復学習。AIが復習期の単語を含む英文を生成、文脈で意味を答える。",
      "url": "",
      "status": "planned",
      "access": "kampa",
      "icon": "🧠",
      "tags": ["英語", "単語", "AI", "Anki"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["Next.js", "Gemini API"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "kobun-tadoku",
      "name": "古文多読教材",
      "subject": "kobun",
      "category": "reading",
      "description": "著作権切れの古文100問（10問実装済み）。知識・読解問題で多読を支援。",
      "url": "[アプリURL未確定]",
      "status": "beta",
      "access": "free",
      "icon": "📜",
      "tags": ["古文", "多読", "読解"],
      "targetLevel": ["高2", "高3"],
      "techStack": ["静的HTML"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "kobun-bunseki",
      "name": "古文品詞分解",
      "subject": "kobun",
      "category": "grammar",
      "description": "古文の品詞分解を学ぶアプリ（構想段階）。",
      "url": "",
      "status": "planned",
      "access": "free",
      "icon": "🔍",
      "tags": ["古文", "品詞分解", "文法"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["静的HTML"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "math-formula-drill",
      "name": "数学公式即答ドリル",
      "subject": "math",
      "category": "drill",
      "description": "公式・基本値の即答訓練。三角関数の値、微積分の頻出形などをフラッシュカード式で。",
      "url": "",
      "status": "planned",
      "access": "kampa",
      "icon": "📐",
      "tags": ["数学", "公式", "ドリル", "Anki"],
      "targetLevel": ["高1", "高2", "高3"],
      "techStack": ["Next.js"],
      "lastUpdated": "2026-04-30"
    },
    {
      "id": "chemistry-memorize",
      "name": "化学暗記補助",
      "subject": "chemistry",
      "category": "memorize",
      "description": "化学の暗記事項（無機の沈殿色、有機の反応など）を効率的に覚える。構想段階。",
      "url": "",
      "status": "planned",
      "access": "kampa",
      "icon": "⚗️",
      "tags": ["化学", "暗記"],
      "targetLevel": ["高2", "高3"],
      "techStack": ["未定"],
      "lastUpdated": "2026-04-30"
    }
  ]
}
```

## 6. UI/UX 仕様

### 6.1 デザイン方針：「ゆっくり × 最先端」のギャップ

塾名の「ゆっくり」と、AI技術を使う「最先端」のギャップを売りにする。サイト全体のトーンに以下を反映する。

**配色**

- ベース：和の落ち着いた色（生成り色 `#F5F1E8`、墨色 `#2C2C2C`、藍色 `#1F3A5F`、抹茶色 `#7A8B5C` のいずれかをベースカラーに）
- アクセント：ニュートラルなグレー、テクノロジー感のある青を控えめに

**フォント**

- 見出し・キャッチコピー：明朝系（Noto Serif JP）→「ゆっくり」「丁寧」感
- 本文：明朝でもサンセリフでも可。可読性優先
- 強調・バッジ：サンセリフ（Noto Sans JP）でメリハリ

**余白**

- たっぷり取る。情報を詰め込まない。
- カード間・セクション間に十分な空白。

**装飾**

- 派手なグラデーション・激しいアニメーションは避ける
- カードのホバー時にふわっと浮き上がる程度のさりげない動きはOK
- スムーズスクロールは入れる

### 6.2 アプリカードのバッジ表示ルール

カードには以下のバッジを表示する。

| 条件 | バッジ | 色 |
|------|-------|-----|
| `status: production` | （なし） | - |
| `status: beta` | 🧪 ベータ版 | オレンジ |
| `status: alpha` | ⚠️ 試験運用 | 黄色 |
| `status: development` | 🔧 開発中 | グレー |
| `status: planned` | 💭 構想中 | 薄グレー |
| `access: free` | 🆓 無料 | 緑 |
| `access: kampa` | 🔐 カンパ制 | 青 |
| `access: students_only` | 👥 塾生限定 | 紫 |
| `lastUpdated`が30日以内 | ✨ NEW | 赤 |

### 6.3 リンクの有効/無効

- `status: development` または `planned` の場合、カードは表示するがクリック不可
- `url` が空文字の場合も同様にクリック不可

### 6.4 科目別グルーピング

`apps` 配列を `subject` でグルーピングし、`subjectOrder` の順序で表示する。

科目名の日本語表示：

```typescript
const SUBJECT_NAMES = {
  english: "英語",
  kobun: "古文",
  math: "数学",
  chemistry: "化学",
  biology: "生物",
  physics: "物理"
};
```

### 6.5 レスポンシブ対応

- モバイルファースト
- スマホで快適に閲覧できること
- カードはスマホで1列、タブレットで2列、PCで3列を目安に

### 6.6 アクセシビリティ

- 色だけでなくテキストでも情報を伝える（バッジは色＋文字）
- 適切なコントラスト比を確保
- セマンティックなHTML

frontend-design スキル（/mnt/skills/public/frontend-design/SKILL.md）の指針に従うこと。

## 7. 認証実装（middleware.ts）

### 7.1 仕様

- `/students/*` 配下のすべてのページにBasic認証をかける
- パスワードは環境変数 `STUDENT_PASSWORD` で管理（Vercelの管理画面で設定）
- ユーザー名は固定値 `student`
- 認証失敗時は401を返し、ブラウザの認証ダイアログを表示

### 7.2 実装例

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization');
  const expectedAuth = 'Basic ' + Buffer.from(`student:${process.env.STUDENT_PASSWORD}`).toString('base64');

  if (auth !== expectedAuth) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Students Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/students/:path*',
};
```

### 7.3 パスワード運用

- 半年ごとに `STUDENT_PASSWORD` を更新（Vercel管理画面で変更してデプロイ）
- 塾生には新パスワードを口頭または塾内で配布
- 個別アプリのカンパ用パスワードも同じタイミングで更新するのが理想
- **パスワードはこのリポジトリに含めないこと**（環境変数のみで管理）

## 8. 個別アプリ側の認証（参考）

窓口サイトとは別プロジェクトの各アプリ（カンパ制のもの）では、それぞれのプロジェクトに同様のmiddleware.tsを置く。

- 環境変数：`APP_PASSWORD`（アプリごとに別パスワード）
- ユーザー名：`user` で固定
- このパスワードは「塾生用ページ」と「カンパで支払った一般利用者」に配布する

## 9. 運用フロー

### 9.1 アプリの追加・更新

1. `data/apps.json` を編集
2. GitHubにpush
3. Vercelが自動デプロイ
4. 反映を確認

### 9.2 パスワード更新（半年ごと）

1. Vercel管理画面で `STUDENT_PASSWORD` を更新
2. 各アプリの `APP_PASSWORD` も更新
3. 各プロジェクトを再デプロイ
4. 塾生・カンパ利用者に新パスワードを配布
5. `/students/page.tsx` のパスワード一覧表示を更新（apps.jsonに記載しないこと）

### 9.3 塾ブログからの誘導

ブログ記事の末尾に「アプリ一覧はこちら」のリンクを貼る運用。記事ごとに案内文を統一しておくと管理が楽。note（https://note.com/yukkuri_jyuku）に一本化済み。アメブロは運用終了。

## 10. 制約事項・注意点

### 10.1 やってはいけないこと

- **apps.jsonにパスワード情報を含めない**（公開ファイルになるため）
- **APIキーをコードに直書きしない**（環境変数で管理）
- **塾生用ページの内容を公開ページから推測できる形にしない**

### 10.2 拡張時の指針

- アプリ数が30を超えたら、検索・フィルタ機能を検討
- 塾生数が50を超えたら、共通パスワードからログイン機能への移行を検討
- カンパの決済方法はStripe（クレジットカード決済）およびnote内決済（一部商品）に移行済み（銀行振込・PayPayは廃止）

### 10.3 不要な機能（最初は実装しない）

- ユーザー登録・ログイン（共通パスワードで十分）
- アプリの利用統計・ダッシュボード（必要になってから）
- お問い合わせフォーム（塾ブログ経由でいい。note移行後はnoteのコメント欄等を想定）
- 多言語対応（日本語のみ）

## 11. 開発の進め方

1. **Phase 1**：トップページのみ実装、apps.jsonでアプリ一覧表示
2. **Phase 2**：塾生用ページ実装、Basic認証導入
3. **Phase 3**：デザイン磨き込み、レスポンシブ調整
4. **Phase 4**：本番デプロイ、塾ブログ（note）にリンク設置

各Phaseを完了してから次へ。一気に全部作ろうとしないこと。

## 12. 引き継ぎ事項（Code向け）

### 12.1 確定済みの情報

- 塾名：**ゆっくり塾**（既存の「上松ゆっくり塾」とはブランドを分離、2026年7月〜）
- noteアカウントURL：**https://note.com/yukkuri_jyuku**（`site.blogUrl` 差し替え済み、アメブロは運用終了）
- キャッチコピー：**ゆっくり塾の、ありそうでなかった学習アプリ**
- 説明文：**現場の指導から生まれた学習アプリ群。AIを使いながら、生徒のペースに寄り添います。**
- カンパ価格：**半年2,000円／年3,500円**（塾生は無料）
- カンパの支払い方法：**クレジットカード決済（Stripe）／note内の決済（一部商品）**に移行済み（銀行振込・PayPayは廃止）
- 特定商取引法に基づく表記ページ（`/tokushoho`）を新設・公開済み（Stripe審査対応）

### 12.2 塾長から後日受け取る情報

- 各アプリの実際のURL（apps.jsonの `url` フィールド）
- 塾生用パスワード `STUDENT_PASSWORD`（Vercel環境変数として設定）
- 各アプリのカンパ用パスワード `APP_PASSWORD`（各アプリのVercel環境変数）

### 12.3 デザインに関する留意点

- **「ゆっくり × 最先端」のギャップ**を視覚的に表現すること
- 和の落ち着きと現代的な洗練の両立
- 派手すぎず、地味すぎず
- 「ゆっくり塾」のブランドイメージを損なわないこと
