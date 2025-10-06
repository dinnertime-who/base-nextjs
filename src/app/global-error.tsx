"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 글로벌 에러를 로깅 서비스에 보낼 수 있습니다
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="ko">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                background-color: #ffffff;
                color: #1a1a1a;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .container {
                display: flex;
                min-height: 100vh;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 1rem;
              }
              .content {
                text-align: center;
                max-width: 600px;
              }
              .title {
                font-size: 6rem;
                font-weight: 700;
                color: #000000;
                margin-bottom: 1rem;
              }
              .heading {
                font-size: 1.875rem;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 1rem;
              }
              .description {
                font-size: 1rem;
                text-align: center;
                color: #6b7280;
                margin-bottom: 0.5rem;
                line-height: 1.5;
              }
              .error-code {
                font-size: 0.875rem;
                color: #9ca3af;
                margin-top: 0.5rem;
              }
              .button-group {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 2rem;
                flex-wrap: wrap;
              }
              .btn {
                padding: 0.625rem 1.25rem;
                font-size: 0.875rem;
                font-weight: 500;
                border-radius: 0.375rem;
                cursor: pointer;
                transition: all 0.2s;
                text-decoration: none;
                display: inline-block;
                border: none;
              }
              .btn-primary {
                background-color: #000000;
                color: #ffffff;
              }
              .btn-primary:hover {
                background-color: #1f2937;
              }
              .btn-outline {
                background-color: transparent;
                color: #374151;
                border: 1px solid #d1d5db;
              }
              .btn-outline:hover {
                background-color: #f9fafb;
              }
              @media (max-width: 640px) {
                .title {
                  font-size: 3rem;
                }
                .heading {
                  font-size: 1.25rem;
                }
                .description {
                  font-size: 0.875rem;
                }
                .btn {
                  font-size: 0.875rem;
                  padding: 0.5rem 1rem;
                }
              }
            `,
          }}
        />
      </head>
      <body>
        <div className="container">
          <div className="content">
            <h1 className="title">오류</h1>
            <h2 className="heading">심각한 문제가 발생했습니다</h2>
            <p className="description">
              애플리케이션에 예상치 못한 오류가 발생했습니다. <br />
              페이지를 새로고침해주세요.
              <br />
              <br />
              문제가 계속될 경우 관리자에게 문의해주세요.
            </p>
            {error.digest && (
              <p className="error-code">오류 코드: {error.digest}</p>
            )}
            <div className="button-group">
              <button onClick={() => reset()} className="btn btn-primary">
                다시 시도
              </button>
              <a href="/" className="btn btn-outline">
                홈으로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
