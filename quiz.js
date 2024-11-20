// 퀴즈 데이터: 난이도에 따른 문제 세트
const quizData = {
    easy: [
        { question: "우왁굳의 생일은?", answer: "7월 24일", distractors: ["8월 15일", "6월 18일", "5월 1일"] },
        { question: "우왁굳이 키우는 반려동물 이름은?", answer: "메시", distractors: ["코비", "쿠키", "펭귄"] },
        { question: "우왁굳이 유학한 국가는?", answer: "일본", distractors: ["미국", "영국", "독일"] },
        { question: "우왁굳의 배우자 닉네임은?", answer: "엔젤", distractors: ["천사", "요정", "스타"] },
        { question: "그 분의 성별은?", answer: "여성", distractors: ["남성", "중성", "모름"] },
        { question: "우왁굳이 사는 도시는?", answer: "인천", distractors: ["서울", "부산", "대전"] },
        { question: "우왁굳이 방송하는 플랫폼은?", answer: "아프리카", distractors: ["유튜브", "트위치", "카카오TV"] },
        { question: "우왁굳의 팬카페 이름은?", answer: "왁물원", distractors: ["왁구랜드", "왁팬카페", "왁세상"] },
        { question: "우왁굳이 런칭한 아이돌 이름은?", answer: "이세계아이돌", distractors: ["환상아이돌", "가상아이돌", "이상아이돌"] },
        { question: "우왁굳의 본명은?", answer: "오영택", distractors: ["김철수", "이영민", "박우진"] },
    ],
    medium: [
        { question: "우왁굳의 소속사 이름은?", answer: "패러블 엔터테인먼트", distractors: ["왁물원 엔터", "아프리카 엔터", "왁굳 엔터"] },
        { question: "고멤에 핑크 머리 캐릭터가 있다/없다", answer: "있다", distractors: ["없다", "잘 모름", "보라 머리"] },
    ],
    hard: [
        { question: "뢴트게늄의 mbti는?", answer: "infp", distractors: ["intp", "entp", "enfp"] },
        { question: "우왁굳은 방송에 왁두를 제외한 다른 버튜버 아바타를 낀 적 있다/없다", answer: "있다", distractors: ["없다", "모른다", "간혹 있다"] },
    ],
};

let selectedDifficulty = "";  // 선택된 난이도
let currentQuiz = [];        // 현재 퀴즈 문제 세트
let currentIndex = 0;        // 현재 문제 인덱스
let score = 0;               // 점수

// 퀴즈 시작 함수
function startQuiz(difficulty) {
    console.log("난이도 선택:", difficulty);  // 난이도 확인
    selectedDifficulty = difficulty;
    currentQuiz = shuffle(quizData[difficulty]).slice(0, 10);  // 퀴즈 데이터 셔플 후 10개 문제 가져오기
    console.log("선택된 문제 세트:", currentQuiz);  // 선택된 문제 세트 확인

    currentIndex = 0;
    score = 0;

    // UI 업데이트
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();  // 첫 번째 문제 보여주기
}

// 문제 보여주는 함수
function showQuestion() {
    if (currentIndex >= currentQuiz.length) {
        endQuiz();  // 모든 문제를 다 풀었다면 퀴즈 종료
        return;
    }

    const questionData = currentQuiz[currentIndex];
    document.getElementById("question").textContent = `${currentIndex + 1}. ${questionData.question}`;
    document.getElementById("choices").innerHTML = "";  // 이전 선택지 제거

    // 정답과 오답을 섞어서 4지선다 구성
    const allChoices = shuffle([questionData.answer, ...questionData.distractors]).slice(0, 4);
    allChoices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.className = "choice-button";
        button.onclick = () => checkAnswer(choice);  // 선택된 답 체크
        document.getElementById("choices").appendChild(button);
    });

    // 진행 상태 표시
    document.getElementById("progress").textContent = `문제 ${currentIndex + 1} / ${currentQuiz.length}`;
}

// 답안 체크 함수
function checkAnswer(selectedAnswer) {
    const correctAnswer = currentQuiz[currentIndex].answer;

    if (selectedAnswer === correctAnswer) {
        score++;  // 정답일 경우 점수 추가
    }

    currentIndex++;  // 다음 문제로 넘어가기
    showQuestion();   // 다음 문제 보여주기
}

// 퀴즈 종료 함수
function endQuiz() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    document.getElementById("final-score").textContent = `최종 점수: ${score} / ${currentQuiz.length}`;
}

// 문제 배열 랜덤 섞기
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
