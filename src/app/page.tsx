export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          訪問看護事業支援システム
        </h1>
        
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            開発中のシステム
          </h2>
          <p className="text-gray-600 mb-4">
            このシステムは現在開発中です。訪問看護事業の業務効率化を目指しています。
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                シフト管理
              </h3>
              <p className="text-primary-700">
                スタッフの希望を考慮した自動シフト作成
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                勤怠管理
              </h3>
              <p className="text-primary-700">
                GPS連動による正確な訪問記録
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                給与計算
              </h3>
              <p className="text-primary-700">
                複雑な係数を考慮した自動計算
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-primary-800 mb-3">
                看護記録
              </h3>
              <p className="text-primary-700">
                音声入力による効率的な記録作成
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <a
            href="/login"
            className="btn-primary inline-block text-lg px-8 py-3"
          >
            ログイン画面へ
          </a>
        </div>
      </div>
    </main>
  )
}