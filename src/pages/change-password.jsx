import { Helmet } from 'react-helmet-async';
import ChangePasswordView from 'src/sections/user/change-password-view';

export default function ChangePassword() {
  return (
    <>
      <Helmet>
        <title> Thay đổi mật khẩu </title>
      </Helmet>
      <ChangePasswordView />
    </>
  );
}
