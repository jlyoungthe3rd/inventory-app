import { beforeEach, describe, expect, it } from "vitest";
import { useSessionStorage } from "../useSessionStorage";
import { act, renderHook } from "@testing-library/react";

describe('useSessonStorage', () => {

    beforeEach(() => {
        window.sessionStorage.clear()
    })

    it('should use the initial value if sessonStorage is empty', () => {
        const { result } = renderHook(() =>
            useSessionStorage('test-key', 'initial')
        )

        expect(result.current[0]).toBe('initial')
    })

    it('should not use the initial value if sessonStorage is empty', () => {
        window.sessionStorage.setItem('test-key', JSON.stringify('test-search'))

        const { result } = renderHook(() =>
            useSessionStorage('test-key', 'initial)'))

        expect(result.current[0]).toBe('test-search')
    })

    it('should update the state when the search changes', () => {
        const { result } = renderHook(() =>
            useSessionStorage('test-key', 'initial'))

        act(() => {
            result.current[1]('new-search')
        }) // i don't know how to update the state using act

        const item = window.sessionStorage.getItem('test-key')

        expect(JSON.parse(item!)).toBe('new-search')

    })
})