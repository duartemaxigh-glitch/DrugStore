import AppRouter from './routes/AppRouter.jsx';
import Toast from '@/components/ui/Toast/Toast';


export default function App() {
  return (
    <>
      <AppRouter/>
      <Toast />
    </>
  );
}
