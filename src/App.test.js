import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // <a>タグを
  const linkElement = screen.getByText(/react/i); // i：小文字大文字無視する
  // ドキュメント内に<a>タグがあるか
  expect(linkElement).toBeInTheDocument();
});
