/* eslint-disable no-undef */

describe('Home page', () => {
  
    beforeEach(() => {
        cy.visit('/')
    })

    it('home page can be opened', () => {
        cy.contains(/Tasks/gi).should('be.visible')
    })

    it('add form can be opened', () => {
        cy.contains(/Create task/gi).click()
        cy.contains(/Add task/gi).should('be.visible')
    })
})

describe('Create tasks', () => {

    it('success message shold be shown', () => {
        cy.visit('/create-task')

        cy.get('input[name=title]').type('Task 1')
        cy.get('textarea[name=description]').type('Description 1')
        cy.get('input[name="completed"]').check()
        cy.get('form').submit()

        cy.contains(/Task created successfully/gi).should('be.visible')
    })

    it('created task shold be shown', () => {
        cy.visit('/')
        cy.contains(/Task 1/gi).should('be.visible')
        cy.contains(/Description 1/gi).should('be.visible')
    })

    it('completed task shold be checked', () => {
        cy.visit('/')
        cy.contains(/Description 1/gi).next().next().should('be.checked')
    })

    it('Only 1 task should be shown', () => {
        cy.visit('/')
        cy.get('[data-testid="tasks-list"]').children().should('have.length', 1)
    })
})

describe('Update task', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('update form can be opened', () => {
        cy.get('a').contains(/Edit/gi).click()
        cy.contains(/Edit task/gi).should('be.visible')
    })

    it('success message shold be shown', () => {
        cy.get('a').contains(/Edit/gi).click()
        cy.get('input[name=title]').clear().type('Task 2')
        cy.get('textarea[name=description]').clear().type('Description 2')
        cy.get('input[name="completed"]').uncheck()
        cy.get('form').submit()

        cy.contains(/Task updated successfully/gi).should('be.visible')
    })

    it('updated task shold be shown', () => {
        cy.contains(/Task 2/gi).should('be.visible')
        cy.contains(/Description 2/gi).should('be.visible')
    })

    it('completed task shold not be checked', () => {
        cy.contains(/Description 2/gi).next().next().should('not.be.checked')
    })

    it('only 1 task should be shown', () => {
        cy.get('[data-testid="tasks-list"]').children().should('have.length', 1)
    })
})

describe('Update a not existing task', () => {
    it('task form should be showed', () => {
        cy.visit('/edit-task/noValidID')
        cy.contains(/Edit task/gi).should('be.visible')
    })
})

describe('Delete task', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('task can be deleted', () => {
        cy.contains(/Delete/gi).click()
        cy.contains(/Task deleted successfully/gi).should('be.visible')
    })

    it('no task should be shown', () => {
        cy.get('[data-testid="tasks-list"]').children().should('have.length', 0)
    })
})