let isLogin = true;
let users = [];

fetch('users.json')
  .then(response => response.json())
  .then(data => {
    users = data.users;
  })
  .catch(error => console.error('Error loading users:', error));

function toggleMode() {
  isLogin = !isLogin;
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const submitText = document.getElementById('submitText');
  const toggleBtn = document.getElementById('toggleBtn');
  const confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
  const submitIcon = document.getElementById('submitIcon');

  if (isLogin) {
    title.textContent = 'Welcome back';
    description.textContent = 'Enter your credentials to access your account';
    submitText.textContent = 'Sign In';
    toggleBtn.textContent = "Don't have an account? Sign up";
    confirmPasswordGroup.style.display = 'none';
  
    submitIcon.innerHTML = `
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    `;
  } else {
    title.textContent = 'Create account';
    description.textContent = 'Sign up for a new account';
    submitText.textContent = 'Sign Up';
    toggleBtn.textContent = 'Already have an account? Sign in';
    confirmPasswordGroup.style.display = 'block';
 
    submitIcon.innerHTML = `
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    `;
  }

  document.getElementById('authForm').reset();
  clearErrors();
  updateFormState();
}

function handleEmailInput() {
  const email = document.getElementById('email').value;
  const passwordInput = document.getElementById('password');
  const isValidEmail = validateEmail(email);
  
  passwordInput.disabled = !isValidEmail;
  
  if (!isValidEmail) {
    document.getElementById('emailError').textContent = email ? 'Please enter a valid email' : '';
  } else {
    document.getElementById('emailError').textContent = '';
  }
  
  updateFormState();
}

function handlePasswordInput() {
  updateFormState();
}

function updateFormState() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword');
  const submitButton = document.getElementById('submitButton');
  
  const isValidEmail = validateEmail(email);
  const isValidPassword = password.length >= 8;
  
  let isFormValid = isValidEmail && isValidPassword;
  
  if (!isLogin && confirmPassword.style.display !== 'none') {
    isFormValid = isFormValid && (confirmPassword.value === password);
  }
  
  submitButton.disabled = !isFormValid;
}

function togglePassword() {
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eyeIcon');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  
    eyeIcon.innerHTML = `
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    `;
  } else {
    passwordInput.type = 'password';
  
    eyeIcon.innerHTML = `
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    `;
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() {
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  document.getElementById('confirmPasswordError').textContent = '';
}

function handleSubmit(e) {
  e.preventDefault();
  clearErrors();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  let isValid = true;

  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required';
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    isValid = false;
  }

  if (!password) {
    document.getElementById('passwordError').textContent = 'Password is required';
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById('passwordError').textContent = 'Password must be at least 6 characters';
    isValid = false;
  }

  if (!isLogin) {
    if (!confirmPassword) {
      document.getElementById('confirmPasswordError').textContent = 'Please confirm your password';
      isValid = false;
    } else if (password !== confirmPassword) {
      document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
      isValid = false;
    }
  }

  if (isValid) {
    if (isLogin) {
      const user = users.find(u => u.email === email);
      if (!user) {
        document.getElementById('emailError').textContent = ' Sign Up Karna Bhai';
        return;
      }
      if (user.password !== password) {
        document.getElementById('passwordError').textContent = 'Incorrect password';
        return;
      }
      alert('Login successful!');
    } else {
      if (users.some(u => u.email === email)) {
        document.getElementById('emailError').textContent = 'Email already exists';
        return;
      }
      
      users.push({ email, password });
      
      const updatedData = { users };
      const blob = new Blob([JSON.stringify(updatedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'login.json';
      a.click();
      URL.revokeObjectURL(url);
      
      alert('Signup successful|| Jao Login Karo');
      toggleMode();
    }
  }
}




















