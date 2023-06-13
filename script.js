// GitHub 액세스 토큰
const accessToken = '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';

// 게시글 데이터 파일 경로
const filePath = 'data/posts.json';

// 게시글 목록을 출력하는 함수
async function renderPostList() {
  const postList = document.getElementById('post-list');

  // 기존 게시글 목록 초기화
  postList.innerHTML = '';

  try {
    // GitHub API를 사용하여 게시글 데이터 가져오기
    const response = await fetch(`https://api.github.com/repos/Lukim99/test-commu-2/contents/${filePath}`, {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      const posts = JSON.parse(atob(data.content));

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
    } else {
      console.error('Failed to fetch post data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// 게시글 작성 폼 제출 시 이벤트 핸들러
document.getElementById('create-post-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // 입력된 데이터 가져오기
  const nickname = document.getElementById('nickname').value;
  const password = document.getElementById('password').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  try {
    // GitHub API를 사용하여 게시글 데이터 저장
    const response = await fetch(`https://api.github.com/repos/Lukim99/test-commu-2/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Add new post',
        content: btoa(JSON.stringify([
          {
            title: title,
            author: nickname,
            views: 0,
            created: new Date().toISOString().split('T')[0]
          },
          ...posts
        ])),
        sha: ''
      })
    });

    if (response.ok) {
      // 게시글 목록 다시 출력
      await renderPostList();

      // 모달 닫기
      const modal = document.getElementById('create-post-modal');
      modal.style.display = 'none';

      // 폼 초기화
      document.getElementById('create-post-form').reset();
    } else {
      console.error('Failed to save post data:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});

// 초기 게시글 목록 출력
renderPostList();
