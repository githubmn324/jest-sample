import { render, screen, act } from "@testing-library/react";
import Login, { validateEmail } from "../Login";
import userEvent from "@testing-library/user-event";

describe("Test Login Component", () => {
    test("render form with 1 button", async ()=>{
        render(<Login />);
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });

    test("should be failed on email validation", ()=> {
        const testEmail = "abcde.com";
        expect(validateEmail(testEmail)).not.toBe(true);
    });

    test("should be succeeded on email validation", ()=> {
        const testEmail = "abcde@gmail.com";
        expect(validateEmail(testEmail)).toBe(true);
    });

    test("password input should have type password", () => {
        render(<Login />);
        const password = screen.getByPlaceholderText("パスワード入力");
        expect(password).toHaveAttribute("type", "password");
    });

    test("should be able to submit", async () => {
        render(<Login />);
        const submitButton = screen.getByTestId("submit");
        const email = screen.getByPlaceholderText("メールアドレス入力");
        const password = screen.getByPlaceholderText("パスワード入力");
        act(() => {
            userEvent.type(email, "abcde@gmail.com");
            userEvent.type(password, "abcdef");
    
            userEvent.click(submitButton);
        });
        const userInfo = screen.getByText("abcde@gmail.com");
        expect(userInfo).toBeInTheDocument();
    });
})