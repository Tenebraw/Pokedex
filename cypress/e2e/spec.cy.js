
const URL=' http://127.0.0.1:5500/index.html#';

let idsModal = document.querySelectorAll('#Modal');

describe('Comprobaciones Generales.', () => {
  beforeEach(() => {
    cy.visit(URL)
  })
  
it('Comprobando pagina.', () => {

  cy.get("#containercol").should("have.class", "container text-center");
  cy.get("nav").should("have.class", "prueba");
  cy.get("#previous").should("have.class", "page-link");
  cy.get("#next").should("have.class", "page-link");
  cy.get("#actualpage").should("have.class", "inputpage").should('be.disabled').should('have.value',1);
  cy.get("#actualpage").should("have.value", 1);
  cy.get("#previous").contains("Previous");
  cy.get("#next").contains("Next");
  cy.get('header').click();
})
  
})

describe('Verificando funcionamiento.',()=>{
  beforeEach(() => {
    cy.visit(URL)
  })
  it('Verificando cambio pagina.', () => {

    cy.get('#pagego').clear().type("7 {enter}");
    cy.get("#actualpage").should("have.value", 7);

    cy.get('#next').click();
    cy.get('#previous').click();
  
    cy.get('.card-img-top').should("be.visible");
    cy.get(".card-img-top").should("have.length", 20);

    cy.get('header').click();
    cy.get("#actualpage").should("have.value", 1);

  });
})

describe('Verificando seleccion.',()=>{
  beforeEach(() => {
    cy.visit(URL)
  })

  it('Comprobando seleccion.', () => {
    
    cy.get("#modal1").should('not.be.visible');
    cy.get(".btn.btn-primary").eq(0).click();
    cy.get("#modal1").should("be.visible");
  

    cy.get(".btn-close").eq(0).wait(500).click({ force: true });
    cy.get("#modal1").should("not.be.visible");

    cy.get(".btn.btn-primary").eq(0).click();
    cy.get("#modal1").should("be.visible");
    cy.get(".btn.btn-secondary").eq(0).wait(500).click({force:true});
    cy.get("#modal1").should("not.be.visible");
 
  })

  it('Verificar estadisticas.',()=>{
    cy.wait(6000);
    cy.get(".btn.btn-primary").each((pokemon)=>{
      cy.get(pokemon).click({force:true});
      cy.get(".front-default").should("be.visible");
      cy.get(".back-default").should("be.visible");
      cy.get(".shiny-front").should("be.visible");
      cy.get(".shiny-back").should("be.visible");
      cy.get(".types").should("be.visible");
      cy.get(".abilities").should("be.visible");

      cy.get(".health").should("be.visible");
      cy.get(".attack").should("be.visible");
      cy.get(".defense").should("be.visible");
      cy.get(".specialattack").should("be.visible");
      cy.get(".specialdefense").should("be.visible");

    })

  })
  
})




