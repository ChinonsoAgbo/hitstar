import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, it, expect } from 'vitest'
import RegisterScreen from './RegisterScreen.vue'
import { HSubmitButton, HButton, HCard } from '@components/'

describe('RegisterScreen.vue', () => {
    it('renders the component properly', () => {
        const pinia = createPinia()
        const wrapper = mount(RegisterScreen, {
            global: {
                plugins: [pinia]
            }
        })
        
        expect(wrapper.find('h1').text()).toBe('Register for Hitstar')
    })

    it('initially disables the register button', () => {
        const pinia = createPinia()
        const wrapper = mount(RegisterScreen, {
            global: {
                plugins: [pinia]
            }
        })
        
        const registerButton = wrapper.findComponent(HSubmitButton)
        expect(registerButton.attributes('disabled')).toBe('')
    })

    it('enables the register button when form is valid', async () => {
        const pinia = createPinia()
        const wrapper = mount(RegisterScreen, {
            global: {
                plugins: [pinia]
            }
        })
        
        const emailInput = wrapper.find('input#username')
        const passwordInput = wrapper.find('input#password')
        const confirmPasswordInput = wrapper.find('input#confirm-password')

        await emailInput.setValue('test@hitstar.com')
        await passwordInput.setValue('password')
        await confirmPasswordInput.setValue('password')

        const registerButton = wrapper.findComponent(HSubmitButton)
        expect(registerButton.attributes('disabled')).toBeUndefined()
    })

    it('displays validation message when passwords do not match', async () => {
        const pinia = createPinia()
        const wrapper = mount(RegisterScreen, {
            global: {
                plugins: [pinia]
            }
        })
        
        const passwordInput = wrapper.find('input#password')
        const confirmPasswordInput = wrapper.find('input#confirm-password')

        await passwordInput.setValue('password')
        await confirmPasswordInput.setValue('differentpassword')

        const passwordMismatchMessage = wrapper.find('p.text-red-500')
        expect(passwordMismatchMessage.exists()).toBe(true)
        expect(passwordMismatchMessage.text()).toBe('Passwords do not match.')
    })

    it('button is disabled when form is incomplete', async () => {
        const pinia = createPinia()
        const wrapper = mount(RegisterScreen, {
            global: {
                plugins: [pinia]
            }
        })
        
        const emailInput = wrapper.find('input#username')
        const passwordInput = wrapper.find('input#password')

        await emailInput.setValue('')
        await passwordInput.setValue('password')

        //const formInvalidMessage = wrapper.findAll('p.text-red-500').at(1)
        //expect(formInvalidMessage.exists()).toBe(true)
        //expect(formInvalidMessage.text()).toBe('Please fill all fields.')
        const registerButton = wrapper.findComponent(HSubmitButton)
        expect(registerButton.attributes('disabled')).toBe('')
    })

    it('does not display validation message when form is complete and passwords match', async () => {
        const pinia = createPinia()
        const wrapper = mount(RegisterScreen, {
            global: {
                plugins: [pinia]
            }
        })
        
        const emailInput = wrapper.find('input#username')
        const passwordInput = wrapper.find('input#password')
        const confirmPasswordInput = wrapper.find('input#confirm-password')

        await emailInput.setValue('test@hitstar.com')
        await passwordInput.setValue('password')
        await confirmPasswordInput.setValue('password')

        const validationMessages = wrapper.findAll('p.text-red-500')
        expect(validationMessages.length).toBe(0)
    })
})
