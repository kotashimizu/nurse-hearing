// ユーザー関連の型定義
export type UserRole = 'admin' | 'staff' | 'office'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

// スタッフ情報
export interface Staff extends User {
  licenseNumber?: string // 看護師免許番号
  phoneNumber: string
  address: string
  emergencyContact: string
}

// 利用者情報
export interface Patient {
  id: string
  name: string
  address: string
  phoneNumber: string
  emergencyContact: string
  careLevel: number // 要介護度
  difficulty: number // 難易度評価 (0-10)
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// シフト関連
export interface ShiftRequest {
  id: string
  staffId: string
  date: Date
  timeSlots: TimeSlot[]
  status: 'pending' | 'approved' | 'rejected'
  createdAt: Date
}

export interface TimeSlot {
  start: string // HH:mm
  end: string   // HH:mm
  available: boolean
}

// 勤怠関連
export interface Attendance {
  id: string
  staffId: string
  patientId: string
  visitDate: Date
  checkInTime: Date
  checkOutTime: Date
  checkInLocation: Location
  checkOutLocation: Location
  status: 'completed' | 'cancelled' | 'modified'
  notes?: string
}

export interface Location {
  latitude: number
  longitude: number
  accuracy: number
  address?: string
}

// 給与計算関連
export interface SalaryCalculation {
  staffId: string
  month: string // YYYY-MM
  baseSalary: number // 基本給
  visitCount: number // 訪問件数
  averageVisitTime: number // 平均訪問時間（分）
  patientSatisfaction: number // 利用者満足度 (0-10)
  continuousMonths: number // 連続達成月数
  patientDifficulty: number // 利用者難易度 (0-10)
  totalSalary: number // 合計給与
  coefficients: SalaryCoefficients
}

export interface SalaryCoefficients {
  visitCountCoef: number      // (A) 訪問件数係数
  visitTimeCoef: number       // (B) 訪問時間係数
  satisfactionCoef: number    // (C) 利用者満足度評価係数
  continuousCoef: number      // (D) 訪問件数連続基準数到達係数
  difficultyCoef: number      // (E) 利用者難易度係数
}

// 看護記録
export interface NursingRecord {
  id: string
  staffId: string
  patientId: string
  visitDate: Date
  vitalSigns?: VitalSigns
  observations: string
  procedures: string[]
  medications?: string[]
  audioRecordingUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface VitalSigns {
  bloodPressure?: {
    systolic: number
    diastolic: number
  }
  pulse?: number
  temperature?: number
  respiratoryRate?: number
  oxygenSaturation?: number
}

// 評価
export interface PatientEvaluation {
  id: string
  patientId: string
  evaluatorId?: string // 評価者（家族など）
  date: Date
  satisfaction: number // 0-10 (0.1刻み)
  comments?: string
}

// エラー
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}