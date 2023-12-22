'use client';
import '@/styles/signIn/index.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  async function onSubmitSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/auth/signin';
    const formData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(formData);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: formattedData.userId,
        password: formattedData.password,
      }),
    });

    console.log(response.status);
    if (response.status == 200) {
      // 이 데이터 전역으로 저장
      const data = await response.json();
      router.push('/');
    }
  }

  async function onSubmitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/auth/signin';
    const formData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(formData);
    console.log(formattedData);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formattedData,
      }),
    });

    // Handle response if necessary
    console.log(response);
    const data = await response.json();
    console.log(data);
    // ...
  }

  return (
    <article className="sign-mainContainer">
      <div
        onClick={() => setIsLogin(!isLogin)}
        className="sign-checkboxContainer"
      >
        <div className={`sign-arrowlane ${isLogin ? '' : 'sign-register'}`}>
          <img className="sign-arrow" src="/signIn/signArrow.svg" />
        </div>
      </div>
      <div className="sign-contentContainer">
        <div className={`flipper ${isLogin ? '' : 'flip'}`}>
          <form className="sign-div front" onSubmit={onSubmitSignIn}>
            <p className="signIn-letter">SIGN IN</p>
            <input
              name="userId"
              type="text"
              id="id"
              placeholder="YOUR ID"
              minLength={2}
              maxLength={100}
            />
            <input
              name="password"
              type="text"
              id="pw"
              className="pw"
              placeholder="YOUR PASSWORD"
              minLength={2}
              maxLength={100}
            />
            <button type="submit" className="submit-button">
              SUBMIT
            </button>
          </form>

          <form className="sign-div back" onSubmit={onSubmitSignUp}>
            <p className="signIn-letter">SIGN UP</p>
            <input
              name="id"
              type="text"
              id="id"
              className="idSignUp"
              placeholder="YOUR ID"
              minLength={2}
              maxLength={100}
            />
            <input
              name="pw"
              type="text"
              id="pw"
              className="pw"
              placeholder="YOUR PASSWORD"
              minLength={2}
              maxLength={100}
            />
            <input
              name="nickname"
              type="text"
              id="nickname"
              className="nickname"
              disabled
              placeholder="개피곤한 인간말종"
              minLength={2}
              maxLength={100}
            />
            <div className="age-and-gender">
              <select id="age" name="age">
                <option value="" disabled selected hidden>
                  Age
                </option>
                <option value="10대">10 대</option>
                <option value="20대">20 대</option>
                <option value="20대">20 대</option>
                <option value="20대">20 대</option>
                <option value="50대">50 대 이상</option>
              </select>
              <select id="gender" name="gender">
                <option value="" disabled selected hidden>
                  Gender
                </option>
                <option value="female">여자</option>
                <option value="male">남자</option>
              </select>
            </div>
            <button type="submit" className="submit-button submit-signUp">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
