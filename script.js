// Ждём полной загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const magicBtn = document.getElementById("magicBtn");
  let clickCount = 0;

  if (magicBtn) {
    magicBtn.addEventListener("click", function () {
      clickCount++;
      const messages = [
        "✨ Волшебство!",
        "🎉 Ещё раз!",
        "💫 Круто же?",
        "🔥 Ты гений!",
        "⭐ Супер!",
      ];
      const messageIndex = (clickCount - 1) % messages.length;
      magicBtn.textContent = messages[messageIndex];

      const colors = ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      magicBtn.style.background = randomColor;
      showToast("✨ Магия активирована!");
    });
  }
  const num1Input = document.getElementById("num1");
  const num2Input = document.getElementById("num2");
  const operationSelect = document.getElementById("operation");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultBox = document.getElementById("resultBox");

  if (calculateBtn) {
    calculateBtn.addEventListener("click", function () {
      let num1 = parseFloat(num1Input.value);
      let num2 = parseFloat(num2Input.value);
      const operation = operationSelect.value;

      if (isNaN(num1) || isNaN(num2)) {
        resultBox.innerHTML = "❌ Пожалуйста, введите оба числа!";
        resultBox.style.color = "#F87171";
        return;
      }

      let result;
      let error = false;

      switch (operation) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "*":
          result = num1 * num2;
          break;
        case "/":
          if (num2 === 0) {
            error = true;
            resultBox.innerHTML = "⚠️ На ноль делить нельзя!";
            resultBox.style.color = "#F87171";
          } else {
            result = num1 / num2;
          }
          break;
        default:
          error = true;
          result = "Неизвестная операция";
      }
      if (!error) {
        if (result % 1 !== 0) {
          result = result.toFixed(2);
        }
        resultBox.innerHTML = `✅ Результат: ${num1} ${operation} ${num2} = ${result}`;
        resultBox.style.color = "#A78BFA";

        resultBox.style.transform = "scale(1.02)";
        setTimeout(() => {
          resultBox.style.transform = "scale(1)";
        }, 200);
      } else if (!error && operation === "/" && num2 === 0) {
      } else if (error === false) {
        resultBox.style.color = "#A78BFA";
      }
    });
  }
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const hash = this.getAttribute("href");
      if (hash && hash !== "#" && hash.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #1E293B;
            color: #60A5FA;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            border-left: 4px solid #3B82F6;
            animation: slideIn 0.3s ease-out;
            font-size: 14px;
        `;
    if (!document.querySelector("#toast-style")) {
      const style = document.createElement("style");
      style.id = "toast-style";
      style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
      document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "0.3s";
      setTimeout(() => {
        if (toast.parentNode) toast.remove();
      }, 300);
    }, 2000);
  }

  console.log(
    "%c✨ Сайт загружен! Привет, разработчик! 🚀",
    "color: #60A5FA; font-size: 16px; font-weight: bold;",
  );
  console.log(
    "%cНе забывай экспериментировать с кодом!",
    "color: #A78BFA; font-size: 12px;",
  );
});
