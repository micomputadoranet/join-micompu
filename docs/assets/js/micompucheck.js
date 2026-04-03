(async () => {
	const COOKIE_NAME = '_micompu_vst';
	let isInitialized = false;

	// 1. Función para leer la cookie
	const getCookie = (name) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
		return null;
	};

	const initCheckpoint = async () => {
		if (isInitialized) return;

		// 2. VALIDACIÓN PREVIA: Si ya existe el token, solo notificamos y salimos
		const existingToken = getCookie(COOKIE_NAME);
		if (existingToken) {
			window.dispatchEvent(new CustomEvent('checkpoint_ready', { detail: existingToken }));
			isInitialized = true;
			return;
		}

		isInitialized = true;

		try {
			// 3. Carga dinámica de FPJS solo si es necesario
			const fpPromise = import('https://openfpcdn.io/fingerprintjs/v5')
				.then(FingerprintJS => FingerprintJS.load());
			
			const fp = await fpPromise;
			const result = await fp.get();
			const visitorId = result.visitorId;

			const urlParams = new URLSearchParams(window.location.search);
			const cp = urlParams.get('cp');

			console.log('Checkpoint:', visitorId, cp)

			
			// 4. Handshake con Vercel
			const response = await fetch('https://checkpoint.mi-computadora.net/checkpoint', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					fp: visitorId,
					cp: cp,
					origin: window.location.hostname
				})
			});

			const data = await response.json();

			console.log(data);

			/*////////
			if (data.token) {
				// 5. Persistencia 90 días
				const expires = new Date();
				expires.setTime(expires.getTime() + (90 * 24 * 60 * 60 * 1000));
				document.cookie = `${COOKIE_NAME}=${data.token};expires=${expires.toUTCString()};path=/;domain=.mi-computadora.net;SameSite=Lax`;

				// 6. Limpieza de URL
				if (cp) {
					const newUrl = window.location.origin + window.location.pathname;
					window.history.replaceState({}, document.title, newUrl);
				}

				window.dispatchEvent(new CustomEvent('checkpoint_ready', { detail: data.token }));
			}
				//////////*/
		} catch (error) {
			console.error("Checkpoint Error:", error);
			isInitialized = false; // Permitir reintento en caso de fallo de red
		}
	};

	// Activadores
	['scroll', 'click', 'touchstart'].forEach(event =>
		window.addEventListener(event, initCheckpoint, { once: true })
	);
})();