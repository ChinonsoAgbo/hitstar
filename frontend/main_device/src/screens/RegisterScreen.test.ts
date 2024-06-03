import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import RegisterScreen from './RegisterScreen.vue'
import { HSubmitButton, HButton, HCard } from '@components/'

describe('RegisterScreen.vue', () => {
    it('renders the component properly', () => {
        const wrapper = mount(RegisterScreen)
        expect(wrapper.find('h1').text()).toBe('Register for Hitstar')
    })

    it('initially disables the register button', () => {
        const wrapper = mount(RegisterScreen)
        const registerButton = wrapper.findComponent(HSubmitButton)
        expect(registerButton.attributes('disabled')).toBe('disabled')
    })

    it('enables the register button when form is valid', async () => {
        const wrapper = mount(RegisterScreen)
        const emailInput = wrapper.find('input#email')
        const passwordInput = wrapper.find('input#password')
        const confirmPasswordInput = wrapper.find('input#confirm-password')

        await emailInput.setValue('test@hitstar.com')
        await passwordInput.setValue('password')
        await confirmPasswordInput.setValue('password')

        const registerButton = wrapper.findComponent(HSubmitButton)
        expect(registerButton.attributes('disabled')).toBeUndefined()
    })

    it('displays validation message when passwords do not match', async () => {
        const wrapper = mount(RegisterScreen)
        const passwordInput = wrapper.find('input#password')
        const confirmPasswordInput = wrapper.find('input#confirm-password')

        await passwordInput.setValue('password')
        await confirmPasswordInput.setValue('differentpassword')

        const passwordMismatchMessage = wrapper.find('p.text-red-500')
        expect(passwordMismatchMessage.exists()).toBe(true)
        expect(passwordMismatchMessage.text()).toBe('Passwords do not match.')
    })

    it('displays validation message when form is incomplete', async () => {
        const wrapper = mount(RegisterScreen)
        const emailInput = wrapper.find('input#email')
        const passwordInput = wrapper.find('input#password')

        await emailInput.setValue('')
        await passwordInput.setValue('password')

        const formInvalidMessage = wrapper.findAll('p.text-red-500').at(1)
        expect(formInvalidMessage.exists()).toBe(true)
        expect(formInvalidMessage.text()).toBe('Please fill all fields.')
    })

    it('does not display validation message when form is complete and passwords match', async () => {
        const wrapper = mount(RegisterScreen)
        const emailInput = wrapper.find('input#email')
        const passwordInput = wrapper.find('input#password')
        const confirmPasswordInput = wrapper.find('input#confirm-password')

        await emailInput.setValue('test@hitstar.com')
        await passwordInput.setValue('password')
        await confirmPasswordInput.setValue('password')

        const validationMessages = wrapper.findAll('p.text-red-500')
        expect(validationMessages.length).toBe(0)
    })
})
