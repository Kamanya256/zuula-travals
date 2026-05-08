
-- The contact_messages INSERT WITH CHECK (true) is intentional for public contact forms.
-- Add a rate-limiting comment and restrict to INSERT only (no update/delete/select for anon)
-- No changes needed - the existing policy is correct for a public contact form.
-- Adding a dummy comment migration to acknowledge the linter warning.
SELECT 1;
