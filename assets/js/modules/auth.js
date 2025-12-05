/**
 * Authentication Module
 * Handles login, registration, password reset, and form validation
 */

const Auth = {
    // Configuration
    config: {
        minPasswordLength: 8,
        maxPasswordLength: 128,
        passwordRequirements: {
            uppercase: true,
            lowercase: true,
            number: true,
            special: false
        },
        otpLength: 6,
        resendOtpDelay: 60 // seconds
    },

    /**
     * Initialize authentication module
     */
    init() {
        this.initPasswordToggles();
        this.initPasswordStrength();
        this.initFormValidation();
        this.initOtpInputs();
        this.initResendTimer();
        this.initSocialAuth();
        console.log('Auth module initialized');
    },

    /**
     * Password visibility toggle
     */
    initPasswordToggles() {
        document.querySelectorAll('.password-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const input = btn.parentElement.querySelector('input');
                const icon = btn.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.classList.remove('bi-eye');
                    icon.classList.add('bi-eye-slash');
                } else {
                    input.type = 'password';
                    icon.classList.remove('bi-eye-slash');
                    icon.classList.add('bi-eye');
                }
            });
        });
    },

    /**
     * Password strength indicator
     */
    initPasswordStrength() {
        const passwordInputs = document.querySelectorAll('[data-password-strength]');
        
        passwordInputs.forEach(input => {
            const strengthContainer = document.querySelector('.password-strength');
            if (!strengthContainer) return;

            const fill = strengthContainer.querySelector('.password-strength-fill');
            const text = strengthContainer.querySelector('.password-strength-text');

            input.addEventListener('input', () => {
                const strength = this.calculatePasswordStrength(input.value);
                this.updateStrengthIndicator(fill, text, strength);
            });
        });
    },

    /**
     * Calculate password strength
     * @param {string} password 
     * @returns {object} strength info
     */
    calculatePasswordStrength(password) {
        let score = 0;
        const feedback = [];

        if (password.length === 0) {
            return { level: 'none', score: 0, feedback: [] };
        }

        // Length checks
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;

        // Character type checks
        if (/[a-z]/.test(password)) {
            score += 1;
        } else {
            feedback.push('Add lowercase letters');
        }

        if (/[A-Z]/.test(password)) {
            score += 1;
        } else {
            feedback.push('Add uppercase letters');
        }

        if (/[0-9]/.test(password)) {
            score += 1;
        } else {
            feedback.push('Add numbers');
        }

        if (/[^a-zA-Z0-9]/.test(password)) {
            score += 2;
        } else {
            feedback.push('Add special characters');
        }

        // Determine level
        let level = 'weak';
        if (score >= 7) level = 'strong';
        else if (score >= 5) level = 'good';
        else if (score >= 3) level = 'fair';

        return { level, score, feedback };
    },

    /**
     * Update strength indicator UI
     */
    updateStrengthIndicator(fill, text, strength) {
        // Remove all classes
        fill.classList.remove('weak', 'fair', 'good', 'strong');
        
        if (strength.level === 'none') {
            fill.style.width = '0';
            text.textContent = '';
            return;
        }

        fill.classList.add(strength.level);
        
        const labels = {
            weak: 'Weak password',
            fair: 'Fair password',
            good: 'Good password',
            strong: 'Strong password'
        };
        
        text.textContent = labels[strength.level];
    },

    /**
     * Form validation
     */
    initFormValidation() {
        const forms = document.querySelectorAll('.auth-form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (this.validateForm(form)) {
                    this.handleFormSubmit(form);
                }
            });

            // Real-time validation
            form.querySelectorAll('input').forEach(input => {
                input.addEventListener('blur', () => {
                    this.validateField(input);
                });

                input.addEventListener('input', () => {
                    if (input.classList.contains('is-invalid')) {
                        this.validateField(input);
                    }
                });
            });
        });
    },

    /**
     * Validate entire form
     */
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], input[data-validate]');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    },

    /**
     * Validate single field
     */
    validateField(input) {
        const value = input.value.trim();
        const type = input.type;
        const name = input.name;
        let isValid = true;
        let message = '';

        // Remove previous states
        input.classList.remove('is-valid', 'is-invalid');
        const existingFeedback = input.parentElement.querySelector('.invalid-feedback');
        if (existingFeedback) existingFeedback.remove();

        // Required check
        if (input.required && !value) {
            isValid = false;
            message = 'This field is required';
        }
        // Email validation
        else if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }
        // Password validation
        else if (type === 'password' && value && name === 'password') {
            if (value.length < this.config.minPasswordLength) {
                isValid = false;
                message = `Password must be at least ${this.config.minPasswordLength} characters`;
            }
        }
        // Confirm password
        else if (name === 'confirmPassword') {
            const password = document.querySelector('input[name="password"]');
            if (password && value !== password.value) {
                isValid = false;
                message = 'Passwords do not match';
            }
        }
        // Username validation
        else if (name === 'username' && value) {
            if (value.length < 3) {
                isValid = false;
                message = 'Username must be at least 3 characters';
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                isValid = false;
                message = 'Username can only contain letters, numbers, and underscores';
            }
        }

        // Apply validation state
        if (value) {
            input.classList.add(isValid ? 'is-valid' : 'is-invalid');
        }

        // Show error message
        if (!isValid && message) {
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            feedback.textContent = message;
            input.parentElement.appendChild(feedback);
        }

        return isValid;
    },

    /**
     * Handle form submission
     */
    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const formType = form.dataset.authType;
        
        // Show loading state
        this.setLoadingState(submitBtn, true);

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual API)
            await this.simulateApiCall(formType, data);

            // Handle success based on form type
            this.handleSuccess(formType, data);

        } catch (error) {
            this.handleError(error);
        } finally {
            this.setLoadingState(submitBtn, false);
        }
    },

    /**
     * Set button loading state
     */
    setLoadingState(button, isLoading) {
        if (!button) return;
        
        if (isLoading) {
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<span class="spinner"></span> Please wait...';
            button.disabled = true;
        } else {
            button.innerHTML = button.dataset.originalText;
            button.disabled = false;
        }
    },

    /**
     * Simulate API call (replace with actual implementation)
     */
    simulateApiCall(type, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success
                console.log(`${type} API call with data:`, data);
                resolve({ success: true });
            }, 1500);
        });
    },

    /**
     * Handle successful authentication
     */
    handleSuccess(formType, data) {
        switch (formType) {
            case 'login':
                // Store auth token (simulated)
                localStorage.setItem('auth_token', 'simulated_token');
                localStorage.setItem('user_email', data.email);
                
                // Redirect to dashboard
                window.location.href = 'index.html';
                break;

            case 'register':
                // Show success message or redirect
                this.showMessage('Account created successfully! Please check your email to verify your account.', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                break;

            case 'forgot-password':
                // Show success message
                this.showSuccessScreen('Check Your Email', 
                    `We've sent a password reset link to <strong>${data.email}</strong>. Please check your inbox.`);
                break;

            case 'reset-password':
                this.showMessage('Password reset successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
                break;

            case 'verify-otp':
                window.location.href = 'index.html';
                break;
        }
    },

    /**
     * Handle authentication error
     */
    handleError(error) {
        console.error('Auth error:', error);
        this.showMessage(error.message || 'An error occurred. Please try again.', 'error');
    },

    /**
     * Show message notification
     */
    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = `auth-toast auth-toast-${type}`;
        toast.innerHTML = `
            <i class="bi ${type === 'success' ? 'bi-check-circle' : type === 'error' ? 'bi-exclamation-circle' : 'bi-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#auth-toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'auth-toast-styles';
            styles.textContent = `
                .auth-toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 16px 24px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                }
                .auth-toast-success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .auth-toast-error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                .auth-toast-info {
                    background: #d1ecf1;
                    color: #0c5460;
                    border: 1px solid #bee5eb;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(toast);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    },

    /**
     * Show success screen (for password reset etc.)
     */
    showSuccessScreen(title, message) {
        const authCard = document.querySelector('.auth-card');
        if (!authCard) return;

        authCard.innerHTML = `
            <div class="auth-success">
                <div class="auth-success-icon">
                    <i class="bi bi-envelope-check"></i>
                </div>
                <h3>${title}</h3>
                <p>${message}</p>
                <a href="login.html" class="auth-submit-btn" style="display: inline-flex; width: auto; padding: 12px 32px;">
                    <i class="bi bi-arrow-left"></i>
                    Back to Login
                </a>
            </div>
        `;
    },

    /**
     * OTP input handling
     */
    initOtpInputs() {
        const otpContainer = document.querySelector('.otp-inputs');
        if (!otpContainer) return;

        const inputs = otpContainer.querySelectorAll('.otp-input');

        inputs.forEach((input, index) => {
            // Auto-focus next input
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                
                if (value.length === 1) {
                    input.classList.add('filled');
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                    }
                } else {
                    input.classList.remove('filled');
                }

                // Check if all inputs are filled
                this.checkOtpComplete(inputs);
            });

            // Handle backspace
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !input.value && index > 0) {
                    inputs[index - 1].focus();
                }
            });

            // Handle paste
            input.addEventListener('paste', (e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').slice(0, this.config.otpLength);
                
                [...pastedData].forEach((char, i) => {
                    if (inputs[i]) {
                        inputs[i].value = char;
                        inputs[i].classList.add('filled');
                    }
                });

                if (inputs[pastedData.length - 1]) {
                    inputs[pastedData.length - 1].focus();
                }

                this.checkOtpComplete(inputs);
            });

            // Allow only numbers
            input.addEventListener('keypress', (e) => {
                if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                }
            });
        });
    },

    /**
     * Check if OTP is complete
     */
    checkOtpComplete(inputs) {
        const otp = [...inputs].map(i => i.value).join('');
        if (otp.length === this.config.otpLength) {
            // Auto-submit or enable submit button
            const submitBtn = document.querySelector('.auth-submit-btn');
            if (submitBtn) {
                submitBtn.disabled = false;
            }
        }
    },

    /**
     * Resend OTP timer
     */
    initResendTimer() {
        const resendLink = document.querySelector('.resend-timer a');
        if (!resendLink) return;

        let countdown = this.config.resendOtpDelay;
        resendLink.classList.add('disabled');
        
        const timer = setInterval(() => {
            countdown--;
            resendLink.textContent = `Resend in ${countdown}s`;
            
            if (countdown <= 0) {
                clearInterval(timer);
                resendLink.textContent = 'Resend OTP';
                resendLink.classList.remove('disabled');
            }
        }, 1000);

        resendLink.addEventListener('click', (e) => {
            if (resendLink.classList.contains('disabled')) {
                e.preventDefault();
                return;
            }
            
            // Handle resend
            this.resendOtp();
            
            // Restart timer
            countdown = this.config.resendOtpDelay;
            resendLink.classList.add('disabled');
        });
    },

    /**
     * Resend OTP
     */
    resendOtp() {
        console.log('Resending OTP...');
        this.showMessage('OTP has been resent to your email', 'success');
    },

    /**
     * Social auth handlers
     */
    initSocialAuth() {
        document.querySelectorAll('.auth-social-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const provider = btn.classList.contains('google') ? 'google' :
                                btn.classList.contains('facebook') ? 'facebook' :
                                btn.classList.contains('twitter') ? 'twitter' :
                                btn.classList.contains('github') ? 'github' : 'unknown';
                
                this.handleSocialAuth(provider);
            });
        });
    },

    /**
     * Handle social authentication
     */
    handleSocialAuth(provider) {
        console.log(`Authenticating with ${provider}...`);
        this.showMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication initiated...`, 'info');
        
        // In production, redirect to OAuth provider
        // window.location.href = `/auth/${provider}`;
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return !!localStorage.getItem('auth_token');
    },

    /**
     * Get current user
     */
    getCurrentUser() {
        return {
            email: localStorage.getItem('user_email'),
            token: localStorage.getItem('auth_token')
        };
    },

    /**
     * Logout
     */
    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        window.location.href = 'login.html';
    }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});

// Export for use in other modules
window.Auth = Auth;
export default Auth;
