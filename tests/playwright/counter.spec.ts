import { expect, test } from '@playwright/test'

test.describe('counter', () => {
  test('interactions', async ({ page }) => {
    await page.goto('/')

    const counterValue = page.getByTestId('count')
    const counterText = await counterValue.textContent({ timeout: 0 })

    expect(counterText).toBe('0')

    const increment = page.getByRole('button', { name: 'Increment value' })

    await increment.click()

    const counterText2 = await counterValue.textContent({ timeout: 0 })

    expect(counterText2).toBe('1')

    const postValue = page.getByTestId('post-value')

    await expect(postValue).toHaveText('A sample post', { timeout: 10_000 })
  })
})
