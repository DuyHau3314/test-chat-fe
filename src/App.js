import { AppRouter } from '@root/routes';
import { BrowserRouter } from 'react-router-dom';
import '@root/App.scss';
import { socketService } from '@services/socket/socket.service';
import Toast from '@components/toast/Toast';
import { useSelector } from 'react-redux';
import useEffectOnce from '@hooks/useEffectOnce';

const App = () => {
  const { notifications } = useSelector((state) => state);

  useEffectOnce(() => {
    console.log('====setup socket');
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast position="top-right" toastList={notifications} autoDelete={true} />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
export default App;
