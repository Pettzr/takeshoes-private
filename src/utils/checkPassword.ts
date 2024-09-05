export default function checkPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
    return passwordRegex.test(password);
}