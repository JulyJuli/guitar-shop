import { AuthService } from "./auth.service";

describe('Auth service', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('login() should change flag state', (done: DoneFn) => {
    const expectedLoginState = true;
    authService.login();

    expect(authService.isLoggedIn).toBe(expectedLoginState);
    done();
  });
});
