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

    // 폼 입력값 가져오기
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // 게시글 데이터 생성
    const post = {
      title: title,
      password: password,
      author: nickname,
      content: content,
      views: 0,
      created: new Date().toISOString(),
      comments: []
    };

    // GitHub API를 사용하여 게시글 데이터 저장
    const url = `https://api.github.com/repos/{YOUR_USERNAME}/{YOUR_REPO}/contents/${filePath}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `token ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const posts = JSON.parse(atob(data.content));
        posts.push(post);

        const updatedContent = btoa(JSON.stringify(posts));
        const body = {
          message: 'Add new post',
          content: updatedContent,
          sha: data.sha
        };

        fetch(url, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
          .then(response => response.json())
          .then(data => {
            console.log('New post created:', data);
            // 게시글 작성 완료 후 모달 닫기 및 화면 새로고침
            const modal = document.getElementById('create-post-modal');
            modal.style.display = 'none';
            window.location.reload();
          })
          .catch(error => console.error('Error updating file:', error));
      })
      .catch(error => console.error('Error retrieving file:', error));
  });

// 초기 게시글 목록 출력
renderPostList();
