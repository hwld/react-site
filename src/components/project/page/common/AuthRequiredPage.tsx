import React, { AriaAttributes } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';
import { Loading } from './Loading';
import { LoginDialog } from '../../ui/LoginDialog';

type Props = {
  className?: string;
} & AriaAttributes;

const Component: React.FC<Props> = ({ children, className, ...props }) => {
  const { user, authState } = useAuthContext();

  return (
    // aria属性を引き継ぎたい
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={className} {...props}>
      {children}
      {authState.loading && <Loading />}
      {!authState.loading && user.userId === '' && <LoginDialog />}
    </div>
  );
};

export const AuthRequiredPage = Component;
