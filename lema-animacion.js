        const textElement = document.getElementById('animated-text');
        const texts = [
            'Software innovador para un mundo en evolución',
            'Innovative Software for a World in Evolution',
            'Інноваційне програмне забезпечення для світу в еволюції',
            'Innovative Software für eine Welt im Wandel'
        ];
        const typingSpeed = 100; // Velocidad de escritura en milisegundos
        const erasingSpeed = 50;  // Velocidad de borrado en milisegundos
        const delayBetweenTexts = 1000; // Tiempo de espera entre textos en milisegundos

        let currentTextIndex = 0;

        function typeText(text, callback) {
            let index = 0;
            textElement.textContent = ''; // Limpia el texto antes de escribir
            textElement.style.width = 'auto'; // Asegura que el texto ocupe el ancho necesario

            const interval = setInterval(() => {
                textElement.textContent += text[index++];
                if (index >= text.length) { // Cambiado a >= para evitar el texto indefinido
                    clearInterval(interval);
                    textElement.style.width = 'auto'; // Asegura que el texto se muestre completamente
                    setTimeout(() => callback(), delayBetweenTexts);
                }
            }, typingSpeed);
        }

        function eraseText(callback) {
            let index = textElement.textContent.length;

            const interval = setInterval(() => {
                textElement.textContent = textElement.textContent.slice(0, index--);
                if (index < 0) {
                    clearInterval(interval);
                    textElement.style.width = '0'; // Asegura que el texto se oculte correctamente
                    setTimeout(() => callback(), delayBetweenTexts);
                }
            }, erasingSpeed);
        }

        function cycleTexts() {
            typeText(texts[currentTextIndex], () => {
                eraseText(() => {
                    currentTextIndex = (currentTextIndex + 1) % texts.length;
                    cycleTexts();
                });
            });
        }

        cycleTexts(); // Inicia el ciclo de animaciones
