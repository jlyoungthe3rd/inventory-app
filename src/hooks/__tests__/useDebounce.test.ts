import { act, render, renderHook } from "@testing-library/react";
import { useDebounce } from "../useDebounce";
import { describe, beforeEach, vi, afterEach, it, expect } from "vitest";

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    })

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should debounce the value change', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'S' } }
        )

        expect(result.current).toBe('S')

        rerender({ value: 'SW' })

        expect(result.current).toBe('S')

        act(() => { vi.advanceTimersByTime(300) })

        expect(result.current).toBe('SW')
    })
})