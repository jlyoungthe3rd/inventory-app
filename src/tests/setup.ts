import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "../mocks/server";
import '@testing-library/jest-dom/vitest'


// ---- MSW Global Setup ----
beforeAll(async () => {
    //start server
    server.listen()
})

afterEach(async () => {
    //reset handlers
    server.resetHandlers()

})

afterAll(async () => {
    //close server
    server.close()
})

export const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn(
            (key: string, val: string) => (store[key] = val.toString()),
        ),
        clear: vi.fn(() => {
            store = {};
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key];
        }),
    };
})();