import { AuthTabs, ForgotPassword, ResetPassword } from '@pages/auth';
import Error from '@pages/error/Error';
import ProtectedRoute from '@pages/ProtectedRoute';
import { useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ChatSkeleton from '@pages/social/chat/ChatSkeleton';

const Social = lazy(() => import('@pages/social/Social'));
const Chat = lazy(() => import('@pages/social/chat/Chat'));

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: '/',
      element: <AuthTabs />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/app',
      element: (
        <ProtectedRoute>
          <Social />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'chat/messages',
          element: (
            <Suspense fallback={<ChatSkeleton />}>
              <Chat />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '*',
      element: <Error />
    }
  ]);

  return elements;
};
