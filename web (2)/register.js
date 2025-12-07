import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const inpUsername = document.querySelector("#username");
const inpEmail = document.querySelector("#email");
const inpPassword = document.querySelector("#password");
const inpConfirmPwd = document.querySelector("#confirm-password");
const registerForm = document.querySelector("#register-form");

const handleRegister = function(event) {
    event.preventDefault();
    
    let username = inpUsername.value.trim();
    let email = inpEmail.value.trim();
    let password = inpPassword.value.trim();
    let confirmPassword = inpConfirmPwd.value.trim();
    let role_id = 2;
    
    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng nhập đầy đủ tất cả các trường dữ liệu");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!!!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        const userData = {
            uid: user.uid,
            username: username,
            email: email,
            role_id: role_id,
            balance: 0,
            createdAt: new Date().toISOString()
        };

        return addDoc(collection(db, 'users'), userData);
    })
    .then(() => {
        alert("Đăng ký thành công!");
        window.location.href = "login.html";  
    })
    .catch((e) => {
        alert("Lỗi: " + e.message);
    });
};

registerForm.addEventListener('submit', handleRegister);