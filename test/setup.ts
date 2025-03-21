import "@testing-library/jest-dom";
import "@tanstack/react-query";
import { vi } from "vitest";
import "fake-indexeddb/auto";

class IntersectionObserver {
  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit,
  ) {}

  observe(target: Element) {
    // Simulate the element being visible
    this.callback(
      [{ isIntersecting: true, target }] as IntersectionObserverEntry[],
      this as any,
    );
  }

  unobserve(target: Element) {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// Mock ResizeObserver
class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {}

  observe(target: Element) {
    // Mock implementation
  }

  unobserve(target: Element) {
    // Mock implementation
  }

  disconnect() {
    // Mock implementation
  }
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

Object.defineProperty(global, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});
