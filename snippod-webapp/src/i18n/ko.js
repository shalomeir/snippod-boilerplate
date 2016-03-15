/*eslint-disable max-len,quotes*/
export default {
  //Containers
  //DialogWindows
  "home.helloWorld": "한글로 보여야 되요 여긴 홈이고 헬로우 월드~",
  "home.introCard.helloSnippod": "스닙팟-보일러플레이트 데모 어플리케이션",
  "home.introCard.helloSnippodSubText": "본 사이트는 풀스택 데모 웹앱으로 {djangoRestFramework}과" +
    " {react} + {redux}를 이용하여 만들어졌습니다. 자세한 코드는 {gitHubKr}를 참조하세요.",

  "ground.login.messageHeader": "로그인",
  "ground.login.messageBody": "지금 바로 접속해보세요.",
  "ground.register.messageHeader": "가입",
  "ground.register.messageBody": "지금 가입하세요.",

  "loginDialog.title": "지금 로그인하세요",
  "loginDialog.button": "로그인",
  "loginDialog.registerForwarding1": "새로 오셨어요?",
  "loginDialog.registerForwarding2": "가입하기",

  "registerDialog.title": "한번에 가입하세요",
  "registerDialog.emailId": "이메일 ID",
  "registerDialog.password": "비밀번호",
  "registerDialog.confirmPassword": "비밀번호 재확인",
  "registerDialog.username": "사용자명",
  "registerDialog.button": "가입",
  "registerDialog.loginForwarding1": "이미 가입하셨어요?",
  "registerDialog.loginForwarding2": "로그인",

  "postsHeader.posts": "포스트",
  "postsHeader.sort": "정렬기준",

  "postComposer.titlePlaceHolder": "제목",
  "postComposer.linkPlaceHolder": "URL을 입력하거나 붙여넣으세요",
  "postComposer.button": "포스트",
  "postComposer.loginButton": "로그인을 먼저 해 주세요.",

  "posts.confirmCheckModalHeader": "포스트 지우기",
  "posts.confirmCheckModalDescription": "선택한 포스트를 삭제할까요?",

  "comments.confirmCheckModalHeader": "댓글 지우기",
  "comments.confirmCheckModalDescription": "선택한 댓글을 삭제할까요?",
  "comments.commentsIsNone": "댓글이 아직 없어요. 첫 댓글을 달아주시겠어요?",

  "commentComposer.contentPlaceHolder": "댓글을 써보세요 ...",
  "commentComposer.button": "댓글입력",
  "commentComposer.loginButton": "로그인을 먼저 해 주세요.",

  "singlePost.nothingHere": "포스트 비었음",
  "singlePost.nothing": "여긴 보여드릴게 없어요.",
  "singlePost.loading": "로딩..",
  "singlePost.confirmCheckModalHeader": "포스트 지우기",
  "singlePost.confirmCheckModalDescription": "선택한 포스트를 삭제할까요?",

  "user.nothingHere": "포스트 비었음",
  "user.nothing": "여긴 보여드릴게 없어요.",
  "user.loading": "로딩..",

  "userCard.language": "언어",
  "userCard.korean": "한국어",
  "userCard.editButton": "수정",
  "userCard.cancel": "취소",
  "userCard.save": "저장",

  "setting.header": "셋팅",
  "setting.subHeader": "사용하는 언어를 설정하거나 비밀번호를 바꿔보세요.",
  "setting.language": "언어",
  "setting.myLanguage": "내 언어",
  "setting.changePassword": "비밀번호 변경",
  "setting.changePasswordButton": "변경요청",
  "setting.deleteAccount": "계정삭제",
  "setting.confirmCheckModalHeader": "내 계정 삭제",
  "setting.confirmCheckModalDescription": "정말 이 계정을 삭제하시겠어요?",
  "setting.password": "비밀번호",
  "setting.confirmPassword": "비밀번호 재확인",

  //Component
  "comp.authButtons.loginButton": "로그인",
  "comp.authButtons.registerButton": "가입",
  "comp.authButtons.logoutButton": "로그아웃",
  "comp.postsSortingDropdown.newest": "최신순",
  "comp.postsSortingDropdown.upvotes": "올려요순",
  "comp.postsSortingDropdown.comments": "댓글순",
  "comp.post.comments": "{commentCount, plural, =0 {댓글 없음} other {# 댓글}}",
  "comp.post.deletePost": "지우기",
  "comp.comment.deleteComment": "지우기",
  "comp.list.loadMoreButton": "로드하기",
  "comp.list.nothing": "여긴 보여드릴게 없어요.",
  "comp.confirmCheckModal.no": "아니요",
  "comp.confirmCheckModal.yes": "예",

  //Layout
  "layout.navBar.settingButton": "셋팅",
  "layout.sideBar.welcomeText": "환영합니다!",
  "layout.sideBar.homeButton": "홈",
  "layout.sideBar.userButton": "마이페이지",
  "layout.sideBar.settingButton": "셋팅",
  "layout.sideBar.loginButton": "로그인을 먼저 해 주세요.",
  "layout.sideBar.footerMessage": "깃허브 저장소에 방문해 보세요.",
  "layout.footer.footerMessage": "본 데모는 오픈소스 입니다. 깃허브 저장소 {repoGitLink} 에 방문해 보세요.",
  "layout.toastrMessages.testMessage": "토스트 메시지는 팝업 되는 메시지로 글로벌 입니다.",

  //logMessages for validation errors
  "log.default": "안녕하세요",
  "log.required": "입력해주세요",
  "log.invalidEmail": "이메일 주소가 아닌 것 같네요",
  "log.invalidString": "특수문자는 여기에 사용할 수 없어요",
  "log.invalidUrl": "URL을 입력해주세요",
  "log.minLength": "너무 짧아요. 길이가 적어도 {min, plural,\n  =0 {하나이상이}\n  =1 {하나는}\n  =2 {둘은}\n other {# 이상이}\n} 되어야 해요.",
  "log.maxLength": "너무 길어요. 길이가 {max}보다 길면 안되요.",
  "log.space": "공백은 안되요.",
  "log.integer": "숫자만 가능해요.",
  "log.enumeration": "다음 중 하나여야 해요 : {enumerations}",
  "log.donotmatch": "같지 않아요.",

  //toastMessages
  "toast.switchLangTitle": "언어 변경",
  "toast.switchLangBody": "{lang}로 환경이 변경되었어요.",

  "toast.loginTitle": "로그인",
  "toast.loginBody": "{username}님, 접속하셨군요~",

  "toast.registerTitle": "가입완료 & 로그인",
  "toast.registerBody": "{username}님 가입이 되었습니다.",

  "toast.logoutTitle": "로그아웃",
  "toast.logoutBody": "정상적으로 로그아웃 되었습니다.",

  "toast.changeLanguageTitle": "언어설정 변경",
  "toast.changeLanguageBody": "정상적으로 언어 설정이 변경되었습니다.",

  "toast.changePasswordTitle": "비밀번호 변경 성공",
  "toast.changePasswordBody": "정상적으로 비밀번호가 변경되었습니다.",

  "toast.deleteAccountTitle": "계정삭제 성공",
  "toast.deleteAccountBody": "정상적으로 계정이 삭제되었습니다.",

  "toast.submitPostTitle": "포스팅 성공",
  "toast.submitPostBody": "\'{postTitle}\' 포스트가 올라갔어요.",

  "toast.deletePostTitle": "포스트 삭제",
  "toast.deletePostBody": "\'{postTitle}\' 포스트가 삭제되었어요.",

  "toast.submitCommentTitle": "댓글 성공",
  "toast.submitCommentBody": "댓글이 올라갔어요.",

  "toast.deleteCommentTitle": "댓글 삭제",
  "toast.deleteCommentBody": "댓글이 삭제되었어요.",

  "toast.updateUserCardTitle": "유저 정보 업데이트 성공",
  "toast.updateUserCardBody": "@{username} 유저 정보가 새로 저장되었습니다.",

};
