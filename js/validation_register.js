document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const registerButton = document.getElementById('button_reg');
    const form = document.querySelector('form');
    
    const usernameError = document.createElement('div');
    usernameError.className = 'error-message';
    usernameInput.parentNode.insertBefore(usernameError, usernameInput.nextSibling);
    
    const emailError = document.createElement('div');
    emailError.className = 'error-message';
    emailInput.parentNode.insertBefore(emailError, emailInput.nextSibling);
    
    const passwordError = document.createElement('div');
    passwordError.className = 'error-message';
    passwordInput.parentNode.insertBefore(passwordError, passwordInput.nextSibling);
    
    const confirmPasswordError = document.createElement('div');
    confirmPasswordError.className = 'error-message';
    confirmPasswordInput.parentNode.insertBefore(confirmPasswordError, confirmPasswordInput.nextSibling);

    function validateUsername(username) {
        username = username.trim();
        if (!username) return 'Введите логин';
        if (username.length < 5 || username.length > 20) return 'Логин должен быть от 5 до 20 символов';
        return null;
    }

    function validateEmail(email) {
        email = email.trim();
        if (!email) return 'Введите email';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return 'Введите корректный email адрес';
        return null;
    }

    function validatePassword(password) {
        if (!password) return 'Введите пароль';
        if (password.length < 5 || password.length > 20) return 'Пароль должен быть от 5 до 20 символов';
        return null;
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword) return 'Подтвердите пароль';
        if (password !== confirmPassword) return 'Пароли не совпадают';
        return null;
    }

    function updateBorder(input, isValid) {
        input.classList.remove('valid', 'error');
        if (isValid === true) input.classList.add('valid');
        else if (isValid === false) input.classList.add('error');
    }

    function validateForm() {
        const username = usernameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        
        updateBorder(usernameInput, null);
        updateBorder(emailInput, null);
        updateBorder(passwordInput, null);
        updateBorder(confirmPasswordInput, null);
        
        let isValid = true;
        
        const usernameValidation = validateUsername(username);
        if (usernameValidation) {
            usernameError.textContent = usernameValidation;
            updateBorder(usernameInput, false);
            isValid = false;
        } else updateBorder(usernameInput, true);
        
        const emailValidation = validateEmail(email);
        if (emailValidation) {
            emailError.textContent = emailValidation;
            updateBorder(emailInput, false);
            isValid = false;
        } else updateBorder(emailInput, true);
        
        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            passwordError.textContent = passwordValidation;
            updateBorder(passwordInput, false);
            isValid = false;
        } else updateBorder(passwordInput, true);
        
        const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);
        if (confirmPasswordValidation) {
            confirmPasswordError.textContent = confirmPasswordValidation;
            updateBorder(confirmPasswordInput, false);
            isValid = false;
        } else if (!passwordValidation) updateBorder(confirmPasswordInput, true);
        
        return isValid;
    }

    form.addEventListener('submit', function(e) {
        if (!validateForm()) e.preventDefault();
    });

    registerButton.addEventListener('click', function(e) {
        if (!validateForm()) e.preventDefault();
    });

    usernameInput.addEventListener('blur', () => {
        const error = validateUsername(usernameInput.value);
        if (error) {
            usernameError.textContent = error;
            updateBorder(usernameInput, false);
        } else {
            usernameError.textContent = '';
            updateBorder(usernameInput, true);
        }
    });
    
    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value);
        if (error) {
            emailError.textContent = error;
            updateBorder(emailInput, false);
        } else {
            emailError.textContent = '';
            updateBorder(emailInput, true);
        }
    });
    
    passwordInput.addEventListener('blur', () => {
        const error = validatePassword(passwordInput.value);
        if (error) {
            passwordError.textContent = error;
            updateBorder(passwordInput, false);
        } else {
            passwordError.textContent = '';
            updateBorder(passwordInput, true);
        }
        
        const confirmError = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
        if (confirmError) {
            confirmPasswordError.textContent = confirmError;
            updateBorder(confirmPasswordInput, false);
        } else if (!confirmError && confirmPasswordInput.value) {
            updateBorder(confirmPasswordInput, true);
        }
    });
    
    confirmPasswordInput.addEventListener('blur', () => {
        const error = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
        if (error) {
            confirmPasswordError.textContent = error;
            updateBorder(confirmPasswordInput, false);
        } else {
            confirmPasswordError.textContent = '';
            updateBorder(confirmPasswordInput, true);
        }
    });
});