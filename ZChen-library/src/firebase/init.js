import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBLZrqhxEpIhcLp-VFe0HZdlUg5OIp3O1I',
  authDomain: 'week7-zilei.firebaseapp.com',
  projectId: 'week7-zilei',
  storageBucket: 'week7-zilei.firebasestorage.app',
  messagingSenderId: '376966258233',
  appId: '1:376966258233:web:59ebaad17b4cc3a93737e8',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db
