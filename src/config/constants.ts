// アプリケーション定数

// 給与計算関連
export const SALARY_CONSTANTS = {
  BASE_SALARY: 50000, // 基本給
  VISIT_REWARD_BASE: 270000, // 訪問報酬基準額
  STANDARD_VISIT_COUNT: 100, // 基準訪問件数/月
  STANDARD_VISIT_TIME: 60, // 基準訪問時間（分）
  SATISFACTION_BASE: 5, // 満足度基準値
  DIFFICULTY_BASE: 5, // 難易度基準値
  COEFFICIENT_RATE: 0.02, // 係数変化率
  MAX_CONTINUOUS_COEFFICIENT: 1.10, // 連続達成係数上限
} as const

// 訪問時間枠
export const VISIT_TIME_SLOTS = [
  { label: '20分未満', value: 'under20', minutes: 20 },
  { label: '30分未満', value: 'under30', minutes: 30 },
  { label: '30-60分', value: '30to60', minutes: 45 },
  { label: '60-90分', value: '60to90', minutes: 75 },
] as const

// GPS精度要件
export const GPS_ACCURACY = {
  REQUIRED_ACCURACY: 50, // メートル
  TIMEOUT: 30000, // ミリ秒
} as const

// ユーザーロール
export const USER_ROLES = {
  ADMIN: 'admin' as const,
  STAFF: 'staff' as const,
  OFFICE: 'office' as const,
} as const

// ローカルストレージキー
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'nurse-hearing-auth-token',
  USER_PREFERENCES: 'nurse-hearing-preferences',
  DRAFT_RECORDS: 'nurse-hearing-draft-records',
} as const

// APIエンドポイント（相対パス）
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    PROFILE: '/api/auth/profile',
  },
  SHIFTS: {
    LIST: '/api/shifts',
    CREATE: '/api/shifts',
    UPDATE: '/api/shifts/:id',
    DELETE: '/api/shifts/:id',
    APPROVE: '/api/shifts/:id/approve',
  },
  ATTENDANCE: {
    CHECK_IN: '/api/attendance/check-in',
    CHECK_OUT: '/api/attendance/check-out',
    LIST: '/api/attendance',
    UPDATE: '/api/attendance/:id',
  },
  PATIENTS: {
    LIST: '/api/patients',
    CREATE: '/api/patients',
    UPDATE: '/api/patients/:id',
    DELETE: '/api/patients/:id',
  },
  RECORDS: {
    LIST: '/api/records',
    CREATE: '/api/records',
    UPDATE: '/api/records/:id',
    VOICE_UPLOAD: '/api/records/voice',
  },
  SALARY: {
    CALCULATE: '/api/salary/calculate',
    LIST: '/api/salary',
    EXPORT: '/api/salary/export',
  },
} as const

// バリデーションルール
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^0\d{1,4}-?\d{1,4}-?\d{4}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 50,
  NOTES_MAX_LENGTH: 1000,
} as const

// 日付フォーマット
export const DATE_FORMAT = {
  DISPLAY: 'YYYY年MM月DD日',
  API: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
} as const