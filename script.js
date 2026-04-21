let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div>
        <span style="
          text-decoration:${habit.done ? 'line-through' : 'none'};
          color:${habit.done ? '#90ee90' : 'white'}
        ">
          ${habit.text}
        </span>
        <small>🔥 Streak: ${habit.streak}</small>
      </div>
      <div>
        <button class="done-btn" onclick="toggleHabit(${index})">✔</button>
        <button class="delete-btn" onclick="deleteHabit(${index})">✖</button>
      </div>
    `;

    list.appendChild(li);
  });

  // Empty message
  document.getElementById("emptyMsg").style.display =
    habits.length === 0 ? "block" : "none";

  // Progress
  const completed = habits.filter(h => h.done).length;
  const total = habits.length;
  const percent = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText =
    `Progress: ${completed}/${total} habits completed`;
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const habitText = input.value.trim();

  if (habitText === "") return;

  // Prevent duplicates
  if (habits.some(h => h.text.toLowerCase() === habitText.toLowerCase())) {
    alert("Habit already exists!");
    return;
  }

  habits.push({
    text: habitText,
    streak: 0,
    done: false
  });

  saveHabits();
  input.value = "";
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits();
  renderHabits();
}

function toggleHabit(index) {
  habits[index].done = !habits[index].done;

  if (habits[index].done) {
    habits[index].streak += 1;   // 🔥 FIXED (increments properly)
  }

  saveHabits();
  renderHabits();
}

// Load
renderHabits();