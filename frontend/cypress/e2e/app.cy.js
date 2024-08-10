describe('App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	it('Should display the title', () => {
		cy.get('h1').should('have.text', 'Welcome to SALEM');
	});
});
