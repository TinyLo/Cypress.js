import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка формы логина и пароля', function () {

  beforeEach('Начало теста', function () {
    cy.visit('/'); // Зайти на сайт
    cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверить цвет кнопки "Забыли пароль?"
  });

  afterEach('Конец теста', function () {
    cy.get(result_page.close).should('be.visible'); // Проверить, что есть кнопка "Крестик" и она видна пользователю
  });

  it('Проверка авторизации (правильный логин и правильный пароль)', function () {

    cy.get(main_page.email).type(data.login); // Ввести правильный логин
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"

    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить, что после авторизации появляется нужный текст
    cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
  })

  it('Проверка логики восстановления пароля', function () {

    cy.get(main_page.fogot_pass_btn).click(); // Нажать кнопку "Забыли пароль?"
    cy.get(recovery_password_page.email).type(data.login); // Ввести почту для восстановления пароля
    cy.get(recovery_password_page.send_button).click(); // Нажать кнопку "Отправить код"

    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверить, что появляется нужный текст
    cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
  })

  it('Проверка авторизации (правильный логин и неправильный пароль)', function () {

    cy.get(main_page.email).type(data.login); // Ввести правильный логин
    cy.get(main_page.password).type('qastudio123'); // Ввести неправильный пароль
    cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"

    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить, что появляется нужный текст
    cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
  })

  it('Проверка авторизации (неправильный логин и правильный пароль)', function () {

    cy.get(main_page.email).type('ksusha@martynova.ru'); // Ввести неправильный логин
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"

    cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверить, что появляется нужный текст
    cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
  })

  it('Проверка валидации (ввести логин без @)', function () {

    cy.get(main_page.email).type('germandolnikov.ru'); // Ввести логин без @
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"

    cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверить, что появляется нужный текст
    cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
  })

  it('Проверка на приведение к строчным буквам в логине', function () {

    cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввести логин
    cy.get(main_page.password).type(data.password); // Ввести правильный пароль
    cy.get(main_page.login_button).click(); // Нажать кнопку "Войти"

    cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверить, что после авторизации появляется нужный текст
    cy.get(result_page.title).should('be.visible'); // Проверить, что текст виден пользователю
  })

})