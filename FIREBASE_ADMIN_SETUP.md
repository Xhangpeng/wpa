# Firebase Admin Setup

The private dashboard lives at `/admin`.

During setup, `/admin` also accepts the temporary access code `WESTERN`. That mode stores gallery and notice changes in the current browser only, so it is useful for testing the admin UI before Firebase is connected but it is not a production CMS. Remove or change that code before handing the site over publicly.

## Firebase services

Enable these in the Firebase console:

- Authentication: Google provider
- Firestore Database
- Storage

Add your Vercel domains to Firebase Authentication > Settings > Authorized domains.

## Environment variables

Set these in Vercel and in a local `.env` file when developing:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_ADMIN_EMAILS=first-admin@example.com,second-admin@example.com
```

`VITE_ADMIN_EMAILS` controls who can enter the admin panel in the UI.

## Security rules

Update both `firestore.rules` and `storage.rules` before publishing them:

```js
request.auth.token.email in [
  "first-admin@example.com",
  "second-admin@example.com"
]
```

Then publish the rules from Firebase.

Public users can read `gallery` and `notices`. Only admin emails can create, edit, or delete content.
