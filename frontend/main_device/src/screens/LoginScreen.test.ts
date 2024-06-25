import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'
import Login from './LoginScreen.vue'
import { HSubmitButton, HButton, HCard } from '@components/'

describe('Login.vue', () => {

    it('renders the component properly', () => {
        const pinia = createPinia()
        const wrapper = mount(Login, {
            global: {
                plugins: [pinia]
            }
        })
        expect(wrapper.find('h1').text()).toBe('Login for your Hitstar account')
    })

    it('initially disables the login button', () => {
        const pinia = createPinia()
        const wrapper = mount(Login, {
            global: {
                plugins: [pinia]
            }
        })
        const loginButton = wrapper.findComponent(HSubmitButton)
        expect(loginButton.attributes('disabled')).toBe('')
    })

    it('enables the login button when email and password are filled', async () => {
        const pinia = createPinia()
        const wrapper = mount(Login, {
            global: {
                plugins: [pinia]
            }
        })
        const emailInput = wrapper.find('input#username')
        const passwordInput = wrapper.find('input#password')

        await emailInput.setValue('test@hitstar.com')
        await passwordInput.setValue('password')

        const loginButton = wrapper.findComponent(HSubmitButton)
        expect(loginButton.attributes('disabled')).toBeUndefined()
    })

    it('shows validation message when form is incomplete', async () => {
        const pinia = createPinia()
        const wrapper = mount(Login, {
            global: {
                plugins: [pinia]
            }
        })

        const emailInput = wrapper.find('input#username')
        await emailInput.setValue('')

        const passwordInput = wrapper.find('input#password')
        await passwordInput.setValue('')

        const validationMessage = wrapper.find('p.text-red-500')
        expect(validationMessage.exists()).toBe(true)
        expect(validationMessage.text()).toBe('Please fill all fields.')
    })

    it('does not show validation message when form is complete', async () => {
        const pinia = createPinia()
        const wrapper = mount(Login, {
            global: {
                plugins: [pinia]
            }
        })

        const emailInput = wrapper.find('input#username')
        await emailInput.setValue('test@hitstar.com')

        const passwordInput = wrapper.find('input#password')
        await passwordInput.setValue('password')

        const validationMessage = wrapper.find('p.text-red-500')
        expect(validationMessage.exists()).toBe(false)
    })
})
