export function init() {
    const welcomeMessage = document.getElementById("welcome")

    async function showWelcomeMessage() {
        await showAlert("Halo, selamat datang di website saya!");

        const name = await showPrompt("Masukkan nama Anda:");
         if (name !== null && name !== '' && welcomeMessage) {
            welcomeMessage.classList.add("flex")
            welcomeMessage.textContent = `Selamat datang, ${name}!`
        }
    }

    function showAlert(message) {
        const alertModal = document.getElementById('app-alert');
        const alertMessage = document.getElementById('app-alert-message');
        const alertOkButton = document.getElementById('app-alert-ok');

        alertMessage.textContent = message;
        alertModal.classList.add('visible');

        return new Promise((resolve) => {
            alertOkButton.addEventListener('click', () => {
                alertModal.classList.remove('visible');
                resolve()
            }, { once: true });
        })
    }

    function showPrompt(message) {
        const promptModal = document.getElementById('app-prompt');
        const promptMessage = document.getElementById('app-prompt-message');
        const promptInput = document.getElementById('app-prompt-input');
        const promptOkButton = document.getElementById('app-prompt-ok');
        const promptCancelButton = document.getElementById('app-prompt-cancel');

        promptMessage.childNodes[0].nodeValue = message;
        promptInput.value = '';

        promptModal.classList.add('visible');
        promptInput.focus();

        return new Promise((resolve) => {
            const onOkClick = () => {
                promptModal.classList.remove('visible');
                cleanup();
                resolve(promptInput.value);
            };

            const onCancelClick = () => {
                promptModal.classList.remove('visible');
                cleanup();
                resolve(null);
            };

            const cleanup = () => {
                promptOkButton.removeEventListener('click', onOkClick);
                promptCancelButton.removeEventListener('click', onCancelClick);
            };

            promptOkButton.addEventListener('click', onOkClick);
            promptCancelButton.addEventListener('click', onCancelClick);
        });
    }

    setTimeout(() => {
        showWelcomeMessage()
    }, 500);
}