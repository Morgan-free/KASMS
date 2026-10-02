const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
    });
  });
}

const studentResults = [
  {
    student: "Sarah Johnson",
    course: "Clinical Medicine",
    score: 92,
    grade: "A",
  },
  { student: "Grace Smith", course: "Nursing", score: 88, grade: "A" },
  {
    student: "Daniel Brown",
    course: "Clinical Medicine",
    score: 76,
    grade: "B",
  },
];

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const role = document.getElementById("roleSelect").value;
    const name = document.getElementById("nameInput").value.trim();
    const password = document.getElementById("passwordInput").value.trim();

    const validStudent =
      role === "student" && name && password === "student123";
    const validTeacher =
      role === "teacher" && name && password === "teacher123";

    if (validStudent || validTeacher) {
      sessionStorage.setItem("kasmsUser", JSON.stringify({ role, name }));
      window.location.href = "portal.html";
    } else {
      loginMessage.textContent = "Invalid login details. Please try again.";
      loginMessage.style.color = "#b42318";
    }
  });
}

const toggleResultForm = document.getElementById("toggleResultForm");
const teacherFormWrap = document.getElementById("teacherFormWrap");
const teacherResultForm = document.getElementById("teacherResultForm");
const resultsBody = document.getElementById("resultsBody");
const portalUser = document.getElementById("portalUser");

function renderResults() {
  if (!resultsBody) return;

  const savedResults = JSON.parse(
    localStorage.getItem("kasmsResults") || "null",
  );
  const allResults =
    savedResults && savedResults.length ? savedResults : studentResults;

  resultsBody.innerHTML = allResults
    .map(
      (result) => `
        <tr>
          <td>${result.student}</td>
          <td>${result.course}</td>
          <td>${result.score}</td>
          <td>${result.grade}</td>
        </tr>
      `,
    )
    .join("");
}

if (toggleResultForm && teacherFormWrap) {
  toggleResultForm.addEventListener("click", () => {
    teacherFormWrap.classList.toggle("hidden");
  });
}

if (teacherResultForm) {
  teacherResultForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const student = document.getElementById("studentName").value.trim();
    const course = document.getElementById("studentCourse").value;
    const score = Number(document.getElementById("studentScore").value);
    const grade = document.getElementById("studentGrade").value;

    const newResult = { student, course, score, grade };
    const current = JSON.parse(localStorage.getItem("kasmsResults") || "[]");
    current.push(newResult);
    localStorage.setItem("kasmsResults", JSON.stringify(current));

    teacherResultForm.reset();
    teacherFormWrap.classList.add("hidden");
    renderResults();
  });
}

if (portalUser) {
  const userData = JSON.parse(sessionStorage.getItem("kasmsUser") || "null");
  if (!userData) {
    window.location.href = "login.html";
  } else {
    portalUser.textContent = `${userData.role === "teacher" ? "Teacher" : "Student"}: ${userData.name}`;

    if (userData.role === "student") {
      const toggleButton = document.getElementById("toggleResultForm");
      if (toggleButton) toggleButton.style.display = "none";
      const teacherFormWrapEl = document.getElementById("teacherFormWrap");
      if (teacherFormWrapEl) teacherFormWrapEl.style.display = "none";
    }
  }
}

renderResults();
