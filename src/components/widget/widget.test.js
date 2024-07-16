import { CreditCardValidator } from './widget.js';

describe('CreditCardValidator', () => {
  let validator;

  jest.mock('./widget.css', () => ({}));

  beforeEach(() => {
    document.body.innerHTML = '<div class="content"></div>';
    validator = new CreditCardValidator();
    validator.addWidget();
    validator.checkPaymentSystem();
    validator.buttonClick();
  });

  afterEach(() => {
    validator = null;
  });

  describe('checkPaymentSystem', () => {
    it('должно показывать изображение карты Visa, когда первая цифра равна 4', () => {
      const inputField = document.getElementById('InputNumber');
      inputField.value = '4';
      inputField.dispatchEvent(new Event('input'));
      const cardImage = document.getElementById('4');
      expect(cardImage.classList.contains('no-active')).toBe(false);
    });

    it('должно показывать изображение карты Mir, когда первая цифра равна 2', () => {
      const inputField = document.getElementById('InputNumber');
      inputField.value = '2';
      inputField.dispatchEvent(new Event('input'));
      const cardImage = document.getElementById('2');
      expect(cardImage.classList.contains('no-active')).toBe(false);
    });

    it('должно показывать изображение карты Mir, когда первая цифра равна 5', () => {
      const inputField = document.getElementById('InputNumber');
      inputField.value = '5';
      inputField.dispatchEvent(new Event('input'));
      const cardImage = document.getElementById('5');
      expect(cardImage.classList.contains('no-active')).toBe(false);
    });

    it('должно показывать изображение карты jcb, когда первая цифра равна 3', () => {
      const inputField = document.getElementById('InputNumber');
      inputField.value = '3';
      inputField.dispatchEvent(new Event('input'));
      const cardImage = document.getElementById('3');
      expect(cardImage.classList.contains('no-active')).toBe(false);
    });

    it('должно скрывать все изображения карт, когда значение ввода пустое', () => {
      const inputField = document.getElementById('InputNumber');
      inputField.value = '';
      inputField.dispatchEvent(new Event('input'));
      const cardImages = document.querySelectorAll('.image_card');
      cardImages.forEach(image => {
        expect(image.classList.contains('no-active')).toBe(true);
      });
    });

    it('инициализация', () => {
      const inputField = document.getElementById('InputNumber');
      inputField.value = '5';
      inputField.dispatchEvent(new Event('input'));
      const cardImagesBefore = document.getElementsByClassName('no-active');
      expect(cardImagesBefore.length).toBe(3);
      inputField.value = '';
      inputField.dispatchEvent(new Event('input'));
      const cardImagesAfter = document.getElementsByClassName('no-active');
      expect(cardImagesAfter.length).toBe(4);
    });
  });

  describe('luna', () => {
    it('должно возвращать true для правильного номера кредитной карты', () => {
      const validCreditCardNumber = '4716871145525771';
      const isValid = validator.luna(validCreditCardNumber);
      expect(isValid).toBe(true);
    });

    it('должно возвращать false для неправильного номера кредитной карты', () => {
      const invalidCreditCardNumber = '4111111111111112';
      const isValid = validator.luna(invalidCreditCardNumber);
      expect(isValid).toBe(false);
    });
  });

  describe('buttonClick', () => {
    it('должно показать предупреждение "Валидный номер кредитной карты!" для правильного номера кредитной карты', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const inputField = document.getElementById('InputNumber');
      inputField.value = '4716871145525771';
      const button = document.getElementById('buttonValid');
      button.click();
      expect(window.alert).toHaveBeenCalledWith('Valid credit card number!');
    });

    it('должно показать предупреждение "Невалидный номер кредитной карты!" для неправильного номера кредитной карты', () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {});
      const inputField = document.getElementById('InputNumber');
      inputField.value = '4111111111111112';
      const button = document.getElementById('buttonValid');
      button.click();
      expect(window.alert).toHaveBeenCalledWith('Invalid credit card number!');
    });
  });
});
