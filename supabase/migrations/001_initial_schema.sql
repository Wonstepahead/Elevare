-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Careers catalog
CREATE TABLE careers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  holland_codes TEXT[] NOT NULL,
  salary_min INTEGER,
  salary_max INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Majors catalog
CREATE TABLE majors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  holland_codes TEXT[] NOT NULL,
  related_careers TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Career quiz results
CREATE TABLE career_quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  holland_scores JSONB NOT NULL,
  top_careers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Major quiz results
CREATE TABLE major_quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  holland_scores JSONB NOT NULL,
  top_majors JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE major_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE majors ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Careers and Majors: public read
CREATE POLICY "Careers are viewable by everyone" ON careers
  FOR SELECT USING (true);

CREATE POLICY "Majors are viewable by everyone" ON majors
  FOR SELECT USING (true);

-- Quiz results: users can only access their own
CREATE POLICY "Users can view own career results" ON career_quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own career results" ON career_quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own major results" ON major_quiz_results
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own major results" ON major_quiz_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
