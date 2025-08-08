import { configureStore } from "@reduxjs/toolkit";
import authSlice, {
  loginUser,
  registerUser,
  logout,
  clearError,
  setUser,
  initializeAuth,
} from "../authSlice";
import { User } from "@/types";

type TestStore = ReturnType<typeof configureStore<{
  auth: ReturnType<typeof authSlice>;
}>>;

jest.mock("@/lib/api/authApi", () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
  },
}));

describe("authSlice", () => {
  let store: TestStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
    });

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
        removeItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  describe("initial state", () => {
    it("should have correct initial state", () => {
      const state = store.getState().auth;
      expect(state).toEqual({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    });
  });

  describe("reducers", () => {
    it("should handle logout", () => {
      const user: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };
      store.dispatch(setUser(user));

      store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
      expect(state.error).toBe(null);
    });

    it("should handle clearError", () => {
      const mockError = "Test error";
      store.dispatch({ type: "auth/loginUser/rejected", payload: mockError });

      store.dispatch(clearError());

      const state = store.getState().auth;
      expect(state.error).toBe(null);
    });

    it("should handle setUser", () => {
      const user: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };

      store.dispatch(setUser(user));

      const state = store.getState().auth;
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });

    it("should handle initializeAuth with existing localStorage data", () => {
      const user: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };


      (window.localStorage.getItem as jest.Mock)
        .mockReturnValueOnce(JSON.stringify(user)) 
        .mockReturnValueOnce("true"); 

      store.dispatch(initializeAuth());

      const state = store.getState().auth;
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
    });

    it("should handle initializeAuth with no localStorage data", () => {
      store.dispatch(initializeAuth());

      const state = store.getState().auth;
      expect(state.user).toBe(null);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("async thunks", () => {
    it("should handle loginUser.pending", () => {
      store.dispatch({ type: loginUser.pending.type });

      const state = store.getState().auth;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it("should handle loginUser.fulfilled", () => {
      const user: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };

      store.dispatch({
        type: loginUser.fulfilled.type,
        payload: user,
      });

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
      expect(state.error).toBe(null);
    });

    it("should handle loginUser.rejected", () => {
      const errorMessage = "Invalid credentials";

      store.dispatch({
        type: loginUser.rejected.type,
        payload: errorMessage,
      });

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });

    it("should handle registerUser.pending", () => {
      store.dispatch({ type: registerUser.pending.type });

      const state = store.getState().auth;
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it("should handle registerUser.fulfilled", () => {
      const user: User = {
        id: 1,
        email: "test@example.com",
        name: "Test User",
      };

      store.dispatch({
        type: registerUser.fulfilled.type,
        payload: user,
      });

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
      expect(state.error).toBe(null);
    });

    it("should handle registerUser.rejected", () => {
      const errorMessage = "Registration failed";

      store.dispatch({
        type: registerUser.rejected.type,
        payload: errorMessage,
      });

      const state = store.getState().auth;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBe(null);
    });
  });
});