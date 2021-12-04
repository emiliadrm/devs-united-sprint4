```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
		match/tweets/{tweetId} {
    	allow read, write: if request.auth.uid != null;
    }
  }
}
```