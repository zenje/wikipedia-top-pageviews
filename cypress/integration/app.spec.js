import { DEFAULT_NUM_RESULTS } from '../../src/utils/constants';
import {
  COUNTRY, ERROR_MESSAGES, NUMBER_OF_RESULTS,
  START_DATE
} from '../../src/utils/strings';
import { getFormattedDate, getYesterday } from '../../src/utils/utils';

describe('end-to-end test of TopPages functionality', () => {
  const yesterday = getYesterday();
  const yesterdayFormatted = getFormattedDate(yesterday);

  beforeEach(() => {
    cy.visit('/');

    // on initial load and data fetch, validate that loading state happens;
    // wait for loading state to disappear
    waitForAndAssertLoadingAfterFetch();
  });

  it('assert initial values', () => {
    // assert initial input values
    getDateInput().should('have.value', yesterdayFormatted);
    getCountryInput().should('have.value', '');
    getNumberOfResultsInput().should('have.value', String(DEFAULT_NUM_RESULTS));

    // assert that results were fetched and displayed
    assertNumberOfResultsDisplayed(DEFAULT_NUM_RESULTS);

    // check the first result item
    cy.get('#results')
      .find('.result-item')
      .first()
      .invoke('text')
      .should('not.be.empty');
  });

  it('user selects a new date', () => {
    // select 7th day of previous month
    getDateInput().click();
    cy.findByText(/previous month/i).click({ force: true });
    cy.get('.react-datepicker__day--007').click();

    waitForAndAssertLoadingAfterFetch();

    // assert that results were fetched and displayed
    assertNumberOfResultsDisplayed(DEFAULT_NUM_RESULTS);
  });

  it('user changes the number of results (200)', () => {
    changeNumberOfResultsAndAssert(200);
  });

  it('user changes the number of results (25)', () => {
    changeNumberOfResultsAndAssert(25);
  });

  it('user selects a country (valid country, supported by api)', () => {
    getCountryInput().select('United States');

    waitForAndAssertLoadingAfterFetch();

    // assert that results were fetched and displayed
    assertNumberOfResultsDisplayed(DEFAULT_NUM_RESULTS);
  });

  it('user selects a country (invalid country, not supported by api)', () => {
    getCountryInput().select('Western Sahara');

    waitForAndAssertLoadingAfterFetch();

    // assert that there are no results and error is being displayed
    cy.get('#results').should('not.exist');
    cy.get('.error-container')
      .should('exist')
      .should('have.text', ERROR_MESSAGES.COUNTRY);
  });

  it('user selects a country (valid country, supported by api), and then changes number of results', () => {
    getCountryInput().select('United Kingdom');

    waitForAndAssertLoadingAfterFetch();

    // assert that results were fetched and displayed
    assertNumberOfResultsDisplayed(DEFAULT_NUM_RESULTS);

    // change number of results
    changeNumberOfResultsAndAssert(50);
  });
});

function getDateInput() {
  return cy.findByRole('textbox', {
    name: START_DATE,
  });
}

function getCountryInput() {
  return cy.findByRole('combobox', {
    name: COUNTRY,
  });
}

function getNumberOfResultsInput() {
  return cy.findByRole('combobox', {
    name: NUMBER_OF_RESULTS,
  });
}

function waitForAndAssertLoadingAfterFetch() {
  // app displays display loading container
  cy.get('.loading-container').should('exist');

  // wait until loading container is removed
  cy.get('.loading-container').should('not.exist');
}

function changeNumberOfResultsAndAssert(numberOfResults) {
  cy.findByRole('combobox', {
    name: NUMBER_OF_RESULTS,
  }).select(String(numberOfResults));
  assertNumberOfResultsDisplayed(numberOfResults);
}

function assertNumberOfResultsDisplayed(numberOfResults) {
  cy.get('#results')
    .should('be.visible')
    .find('.result-item')
    .should('have.length', numberOfResults);
}
