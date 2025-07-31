let main = document.querySelector('.main-container'); 
let container = document.querySelector('.btn');

container.addEventListener('click', function ok() {
  main.classList.toggle('block');
});

const TOKEN = "8085131988:AAGYXUFB3pxVuZTsCj2AxClTfQcrzPwnfLc";      
const CHAT_ID = 5779274741;       

const form = document.getElementById("msg-form");
const msgInput = document.getElementById("msg-input");
const msgList = document.getElementById("msg-list");
const status = document.getElementById("status");

form.addEventListener("submit", event => {
  event.preventDefault();
  const message = msgInput.value.trim();

  if (!message) {
    status.textContent = "Введите сообщение!";
    return;
  }

  status.textContent = "Отправка...";


  const li = document.createElement("li");
  li.textContent = message;
  msgList.appendChild(li);

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        status.textContent = "✅ Ваше сообщение отправлено!";
        msgInput.value = "";
      } else {
        status.textContent = "❌ Ошибка: " + data.description;
      }
    })
    .catch(err => {
      status.textContent = "❌ Ошибка сети: " + err;
    });
});
