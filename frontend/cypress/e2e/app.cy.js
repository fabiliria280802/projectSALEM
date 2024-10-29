describe('App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('should navigate to login and log in successfully', () => {
		//Check contenido dinamico en HomePage cuando no esta loggeado
		cy.get('.homePageInfo h1').should('have.text', '¡Te esperamos!');
		cy.get('.homePageInfo p').should(
			'contain',
			'Automatización inteligente para la gestión de documentos',
		);
		cy.get('button').contains('Iniciar sesión').click();

		//Visitamos Login
		cy.visit('/login');
		cy.get('input[name="email"]').type('fabiliria@gmail.com');
		cy.get('input[name="password"]').type('business123D');
		cy.get('button[type="submit"]').click();
		cy.url().should('include', '/');
	});

	// Prueba de acceso al dashboard con diferentes roles
	it('should access dashboard only with correct roles', () => {
		// Simula el inicio de sesión como administrador
		cy.loginAsRole('Administrador');

		// Verificar que el dashboard es accesible para el rol de administrador
		cy.visit('/user-management');
		cy.url().should('include', '/user-management');
		cy.contains('Dashboard Page'); // Asegúrate de cambiarlo al contenido correcto

		// Simula el inicio de sesión como proveedor (sin acceso al dashboard)
		cy.loginAsRole('Proveedor');
		cy.visit('/user-management');

		// Verificar redirección o mensaje de error por falta de permisos
		cy.url().should('not.include', '/dashboard');
		cy.contains('Acceso denegado'); // Cambia al mensaje correcto si existe
	});

	// Prueba de flujo de creación de usuario
	it('should allow Admin to create a new user', () => {
		// Simula el inicio de sesión como administrador
		cy.loginAsRole('Administrador');

		// Navega a la página de creación de usuario
		cy.visit('/create-user');

		// Completar el formulario de creación de usuario
		cy.get('input[name="name"]').type('Nuevo Usuario');
		cy.get('input[name="email"]').type('nuevo@example.com');
		cy.get('input[name="role"]').select('Proveedor');
		cy.get('button[type="submit"]').click();

		// Verificar que el usuario fue creado exitosamente
		cy.contains('Usuario creado exitosamente');
	});

	// Prueba de acceso a la página de subida de documentos
	it('should allow access to upload documents based on role', () => {
		// Simula el inicio de sesión como gestor
		cy.loginAsRole('Gestor');

		// Navega a la página de subida de documentos
		cy.visit('/upload-documents');

		// Verificar acceso a la funcionalidad de subida
		cy.contains('Subir documentos');
		cy.get('input[type="file"]').attachFile('example-document.pdf');
		cy.get('button[type="submit"]').click();

		// Verificar que el documento fue subido correctamente
		cy.contains('Documento subido exitosamente');
	});
});
