import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge basic strings', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should override tailwind classes', () => {
    // p-2 should be overridden by p-4
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('should handle undefined and null values', () => {
    expect(cn('class1', undefined, 'class2', null)).toBe('class1 class2');
  });

  it('should handle conditional classes using objects', () => {
    expect(cn({
      'class1': true,
      'class2': false,
      'class3': true
    })).toBe('class1 class3');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should merge a mix of inputs', () => {
    expect(cn(
      'bg-red-500',
      ['p-4', 'text-white'],
      { 'hover:bg-red-600': true, 'hidden': false },
      null,
      undefined,
      'bg-blue-500' // Should override bg-red-500
    )).toBe('p-4 text-white hover:bg-red-600 bg-blue-500');
  });
});
