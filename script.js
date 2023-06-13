// 게시글 데이터 예시
const posts = [
  {
    title: '첫 번째 게시글',
    author: 'John Doe',
    views: 10,
    created: '2023-06-01'
  },
  {
    title: '두 번째 게시글',
    author: 'Jane Smith',
    views: 15,
    created: '2023-06-02'
  }
];

// 게시글 목록을 출력하는 함수
function renderPostList() {
  const postList = document.getElementById('post-list');

  // 기존 게시글 목록 초기화
  postList.innerHTML = '';

  // 각 게시글을 순회하며 HTML 요소 생성
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    const postElem = document.createElement('div');
    postElem.classList.add('post');

    const titleElem = document.createElement('h3');
    titleElem.textContent = post.title;

    const authorElem = document.createElement('p');
    authorElem.textContent = `작성자: ${post.author}`;

    const viewsElem = document.createElement('p');
    viewsElem.textContent = `조회수: ${post.views}`;

    const createdElem = document.createElement('p');
    createdElem.textContent = `작성일: ${post.created}`;

    postElem.appendChild(titleElem);
    postElem.appendChild(authorElem);
    postElem.appendChild(viewsElem);
    postElem.appendChild(createdElem);

    postList.appendChild(postElem);
  }
}

// 게시글 작성 버튼 클릭 시 이벤트 핸들러
document.getElementById('create-post-btn').addEventListener('click', function() {
  const modal = document.getElementById('create-post-modal');
  modal.style.display = 'block';

  // 닫기 버튼 클릭 시 모달 닫기
  modal.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
  });
});

// 게시글 작성 폼 제출 시 이벤트 핸들러
document.getElementById('create-post-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // 입력된 데이터 가져오기
  const nickname = document.getElementById('nickname').value;
  const password = document.getElementById('password').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // 데이터를 GitHub에 저장하고, 성공 시 메인 화면으로 돌아가기
  // 이 부분은 GitHub API를 사용하여 구현해야 합니다.

  // 예시로 데이터를 저장하는 동작만 수행
  posts.push({
    title: title,
    author: nickname,
    views: 0,
    created: new Date().toISOString().split('T')[0]
  });

  // 게시글 목록 다시 출력
  renderPostList();

  // 모달 닫기
  const modal = document.getElementById('create-post-modal');
  modal.style.display = 'none';

  // 폼 초기화
  document.getElementById('create-post-form').reset();
});

// 초기 게시글 목록 출력
renderPostList();
