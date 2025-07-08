-- テスト用ユーザーデータ
INSERT INTO users (id, email, name, role) VALUES
  ('11111111-1111-1111-1111-111111111111', 'admin@example.com', '管理者太郎', 'admin'),
  ('22222222-2222-2222-2222-222222222222', 'manager@example.com', 'マネージャー花子', 'manager'),
  ('33333333-3333-3333-3333-333333333333', 'nurse1@example.com', '看護師一郎', 'staff'),
  ('44444444-4444-4444-4444-444444444444', 'nurse2@example.com', '看護師二子', 'staff');

-- スタッフデータ
INSERT INTO staff (id, user_id, staff_code, phone, employment_type, hire_date, qualification) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'NS001', '090-1234-5678', 'full_time', '2020-04-01', '正看護師'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '44444444-4444-4444-4444-444444444444', 'NS002', '090-2345-6789', 'part_time', '2021-10-01', '正看護師');

-- 患者データ
INSERT INTO patients (id, patient_code, name, phone, address, notes, difficulty_level) VALUES
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'PT001', '田中一郎', '03-1234-5678', '東京都渋谷区渋谷1-1-1', '要介助度5', 3),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'PT002', '佐藤花子', '03-2345-6789', '東京都渋谷区渋谷2-2-2', '認知症あり', 4),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'PT003', '鈴木三郎', '03-3456-7890', '東京都渋谷区渋谷3-3-3', '特記事項なし', 2);

-- 明日から1週間分のシフト希望データ
INSERT INTO shift_requests (staff_id, date, preferred_shift, notes)
SELECT 
  s.id,
  CURRENT_DATE + interval '1 day' * generate_series(1, 7),
  CASE 
    WHEN EXTRACT(DOW FROM CURRENT_DATE + interval '1 day' * generate_series(1, 7)) IN (0, 6) THEN 'off'
    ELSE 'morning'
  END,
  'テストデータ'
FROM staff s;