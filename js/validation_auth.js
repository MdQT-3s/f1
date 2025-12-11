document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const form = document.querySelector('form');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    function validateUsername(username) {
        username = username.trim();
        if (!username) return 'Введите логин';
        if (username.length < 5 || username.length > 20) return 'Логин должен быть от 5 до 20 символов';
        return null;
    }

    function validatePassword(password) {
        if (!password) return 'Введите пароль';
        if (password.length < 5 || password.length > 20) return 'Пароль должен быть от 5 до 20 символов';
        return null;
    }

    function updateBorder(input, isValid) {
        input.classList.remove('valid', 'error');
        if (isValid === true) input.classList.add('valid');
        else if (isValid === false) input.classList.add('error');
    }

    function validateAndSubmit() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        usernameError.textContent = '';
        passwordError.textContent = '';
        updateBorder(usernameInput, null);
        updateBorder(passwordInput, null);
        
        let isValid = true;
        
        const usernameValidation = validateUsername(username);
        if (usernameValidation) {
            usernameError.textContent = usernameValidation;
            updateBorder(usernameInput, false);
            isValid = false;
        } else updateBorder(usernameInput, true);
        
        const passwordValidation = validatePassword(password);
        if (passwordValidation) {
            passwordError.textContent = passwordValidation;
            updateBorder(passwordInput, false);
            isValid = false;
        } else updateBorder(passwordInput, true);
        
        if (isValid) {
            window.location.href = 'index_login.html';
            return true;
        }
        return false;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        validateAndSubmit();
    });

    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        validateAndSubmit();
    });

    usernameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateAndSubmit();
        }
    });
    
    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateAndSubmit();
        }
    });
});