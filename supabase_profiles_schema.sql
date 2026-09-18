-- SikaPitch Profiles Schema Update

-- 1. Create or update startup_profiles
CREATE TABLE IF NOT EXISTS public.startup_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.startup_profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.startup_profiles ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE public.startup_profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';
ALTER TABLE public.startup_profiles ADD COLUMN IF NOT EXISTS founder_name TEXT;
ALTER TABLE public.startup_profiles ADD COLUMN IF NOT EXISTS contact_email TEXT;

ALTER TABLE public.startup_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can do everything on startup_profiles" ON public.startup_profiles;
CREATE POLICY "Admins can do everything on startup_profiles" ON public.startup_profiles FOR ALL USING (public.is_admin());

-- 2. Create or update investor_profiles
CREATE TABLE IF NOT EXISTS public.investor_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.investor_profiles ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE public.investor_profiles ADD COLUMN IF NOT EXISTS focus TEXT;
ALTER TABLE public.investor_profiles ADD COLUMN IF NOT EXISTS ticket_size TEXT;
ALTER TABLE public.investor_profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Pending';
ALTER TABLE public.investor_profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.investor_profiles ADD COLUMN IF NOT EXISTS contact_email TEXT;

ALTER TABLE public.investor_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can do everything on investor_profiles" ON public.investor_profiles;
CREATE POLICY "Admins can do everything on investor_profiles" ON public.investor_profiles FOR ALL USING (public.is_admin());

-- 3. Add missing columns to pitches
ALTER TABLE public.pitches ADD COLUMN IF NOT EXISTS founder_name TEXT;

-- 4. Add missing columns to payments
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payer_name TEXT;
ALTER TABLE public.payments ADD COLUMN IF NOT EXISTS payer_email TEXT;
