import { assert, isHTMLElement, isOdd, raise } from './utils'

describe('utils', () => {
  describe('assert', () => {
    it('should throw an error when condition fails', () => {
      expect(() => assert(false, 'error')).toThrowError('error')
    })

    it('should not throw an error when condition passes', () => {
      expect(() => assert(true, 'error')).not.toThrowError('error')
    })
  })

  describe('raise', () => {
    it('should throw an error', () => {
      expect(() => raise('error')).toThrowError('error')
    })

    it('should throw an error of the specified type', () => {
      expect(() => raise('error', TypeError)).toThrowError(TypeError)
    })
  })

  describe('isHTMLElement', () => {
    it('should return true for an HTMLElement', () => {
      expect(isHTMLElement(document.createElement('div'))).toBe(true)
    })

    it('should return false for a non-HTMLElement', () => {
      expect(isHTMLElement('div')).toBe(false)
    })
  })

  describe('isOdd', () => {
    it('should return true for an odd number', () => {
      expect(isOdd(1)).toBe(true)
    })

    it('should return false for an even number', () => {
      expect(isOdd(2)).toBe(false)
    })
  })
})
