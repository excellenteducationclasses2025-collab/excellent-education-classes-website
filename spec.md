# Specification

## Summary
**Goal:** Add a public registration portal at `/register` with a six-field form, styled to match the existing Holi festival theme.

**Planned changes:**
- Create `RegistrationPage.tsx` with fields: Name, Mobile Number, Email, Gender (Male/Female/Other), School Name, and Class — no login required
- Style the registration page with the existing Holi festival theme (OKLCH palette, holi shadows, Holi animations)
- Wire form submission to the backend registration mutation via `useQueries.ts`
- Add `/register` route in `App.tsx` alongside existing routes
- Add a "Register" navigation link in `Layout.tsx` header alongside existing nav links
- Ensure the backend `Registration` type and `submitRegistration` method include all six fields (name, mobileNumber, email, gender, schoolName, classLevel), adding any missing fields if needed

**User-visible outcome:** Visitors can navigate to `/register` from the header and submit a registration form with their name, mobile number, email, gender, school name, and class — without needing to log in.
