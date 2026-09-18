-- SikaPitch Admin Dashboard Schema Extensions

-- 1. Pitches Table
CREATE TABLE IF NOT EXISTS public.pitches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    startup_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    deck_url TEXT,
    video_url TEXT,
    amount_raising NUMERIC,
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewing', 'Approved', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.pitches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on pitches" ON public.pitches FOR ALL USING (public.is_admin());
CREATE POLICY "Startups can view and create their own pitches" ON public.pitches FOR ALL USING (auth.uid() = startup_id);

-- 2. Documents Table (For Data Room / KYC)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT,
    file_url TEXT NOT NULL,
    document_type TEXT, -- e.g., 'KYC', 'Pitch Deck', 'Financials'
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Verified', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on documents" ON public.documents FOR ALL USING (public.is_admin());
CREATE POLICY "Users can manage their own documents" ON public.documents FOR ALL USING (auth.uid() = user_id);

-- 3. Events Table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    event_type TEXT CHECK (event_type IN ('Pitch Session', 'Webinar', 'Networking', 'Conference')),
    status TEXT DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on events" ON public.events FOR ALL USING (public.is_admin());
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);

-- 4. Enquiries (Contact/Support) Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Unread' CHECK (status IN ('Unread', 'Read', 'Resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Anyone can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- 5. Payments Table (Paystack Transactions)
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'GHS',
    reference TEXT UNIQUE NOT NULL,
    payment_type TEXT, -- e.g., 'Subscription', 'Event Ticket'
    status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Success', 'Failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can do everything on payments" ON public.payments FOR ALL USING (public.is_admin());
CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id);
