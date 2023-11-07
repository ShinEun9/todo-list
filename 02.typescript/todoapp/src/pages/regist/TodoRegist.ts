import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import { linkTo } from '../../Router';
import { onSubmitTodoRegister } from '../../api/todos.api';

const TodoRegist = (): HTMLDivElement => {
  //NOTE - 페이지 요소 생성
  const page: HTMLDivElement 
  = document.createElement('div');
  page.setAttribute('id', 'page');

  //NOTE - 등록 폼 요소 생성
  const RegistForm: HTMLFormElement 
  = document.createElement('form');

  const titleInput: HTMLInputElement 
  = document.createElement('input');

  const contentInput: HTMLTextAreaElement 
  = document.createElement('textarea');

  const ButtonBox: HTMLElement 
  = document.createElement('div');

  const backButton: HTMLButtonElement 
  = document.createElement('button');

  const backButtonText: Text 
  = document.createTextNode('취소');

  const submitRegisterButton: HTMLButtonElement 
  = document.createElement('button');

  const submitRegisterButtonText: Text 
  = document.createTextNode('등록');


  //NOTE - 요소에 속성 및 클래스 추가
  RegistForm.setAttribute('id', 'regist-form');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('maxLength', '15');
  titleInput.setAttribute('placeholder', '할일 제목');
  contentInput.setAttribute('placeholder', '할일 내용');

  ButtonBox.setAttribute('class', 'button-area');
  backButton.setAttribute('type', 'button');
  backButton.setAttribute('class', 'back-button');
  submitRegisterButton.setAttribute('class', 'submit-button');

  //NOTE - 요소 구성
  backButton.appendChild(backButtonText);
  submitRegisterButton.appendChild(submitRegisterButtonText);
  ButtonBox.appendChild(backButton);
  ButtonBox.appendChild(submitRegisterButton);

  RegistForm.appendChild(titleInput);
  RegistForm.appendChild(contentInput);
  RegistForm.appendChild(ButtonBox);

  page.appendChild(Header('TODO 등록'));
  page.appendChild(RegistForm);
  page.appendChild(Footer());

  //NOTE - 폼 제출 이벤트 리스너 추가.
  RegistForm.addEventListener('submit', (event: Event): void => {
    onSubmitTodoRegister(event, titleInput, contentInput);
  });

  //NOTE - 취소 버튼 클릭 시 이벤트 설정.
  backButton.addEventListener('click', (): void => {
    if (confirm('취소 하시겠습니까?')) {
      linkTo('/');
    }
  });

  return page;
};

export default TodoRegist;
